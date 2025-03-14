import axios from 'axios';
import { Request, Response } from 'express';
import models from './track.schema';
import dotenv from 'dotenv';

const favoriteMusic = models.favoriteMusic;
const recentMusic = models.recentMusic;

dotenv.config();
export default class trackController {

  async searchMusic(req: Request, res: Response): Promise<void> {
    const { searchTerm } = req.query;
    const userId = res.locals.user?._id;

    if (!searchTerm) {
      res.status(400).json({ error: "Search term is required" });
      return;
    }

    if (!userId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    try {
      const response = await axios.get('https://api.deezer.com/search', {
        params: { q: searchTerm, limit: 10 }
      });

      const favoriteTracks = await favoriteMusic.find({ userId });

      const favoriteTrackIds = new Set(favoriteTracks.map((track: { id: string }) => track.id));

      const tracks = response.data.data;

      const tracksWithFavoriteStatus = tracks.map((track: any) => ({
        ...track,
        isFavorite: favoriteTrackIds.has(track.id.toString())
      }));


      if (tracks && tracks.length > 0) {
        const tracksWithPreview = tracksWithFavoriteStatus.map((track: any) => ({
          id: track.id,
          title: track.title,
          artist: track.artist.name,
          album: track.album.title,
          preview: track.preview,
          link: track.link,
          albumCover: track.album.cover_big,
          isFavorite: track.isFavorite
        }));
        res.json(tracksWithPreview);
      } else {
        res.status(404).json({ error: "No tracks found for the search term" });
      }
    } catch (error) {
      console.log("Erro ao buscar músicas:", error);
      res.status(500).json({ error: "Erro ao buscar músicas na Deezer" });
    }
  }

  async addRecentMusics(req: any, res: any) {
    try {
      const { userId, currentTrack } = req.body;

      const musicExist = await recentMusic.findOne({ userId, id: currentTrack.id });

      if (musicExist) {
        const updatedMusic = await recentMusic.updateOne(
          { userId, id: currentTrack.id },
          {
            $set: { updatedAt: new Date() }
          }
        );

        if (!updatedMusic) {
          return res.status(422).json({ error: "Erro ao atualizar música, tente novamente mais tarde" });
        }

        return res.status(200).json({ message: "Música atualizada com sucesso" });
      }

      const newRecent = await recentMusic.create({
        userId,
        title: currentTrack.title,
        album: currentTrack.album,
        artist: currentTrack.artist,
        albumCover: currentTrack.albumCover,
        link: currentTrack.link,
        preview: currentTrack.preview,
        id: currentTrack.id,
      });

      if (!newRecent) {
        return res.status(422).json({ error: "Erro ao adicionar música, tente novamente mais tarde" });
      }

      res.status(201).json({ message: "Música adicionada aos recentes" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async addFavoriteMusic(req: any, res: any) {
    try {
      const { userId, track } = req.body;
      console.log('track', track);


      const existingFavorite = await favoriteMusic.findOne({ userId, id: track.id });
      if (existingFavorite) {
        return res.status(400).json({ message: "Música já está favoritada" });
      }

      const newFavorite = await favoriteMusic.create({
        userId,
        title: track.title,
        album: track.album,
        artist: track.artist,
        albumCover: track.albumCover,
        link: track.link,
        preview: track.preview,
        id: track.id,
        isFavorite: true
      });

      if (!newFavorite) {
        return res.status(422).json({ error: "Erro ao favoritar música, tente novamente mais tarde" });
      }

      res.status(201).json({ message: "Música favoritada com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async findRecentMusicsUser(req: any, res: any) {
    const MAX_RECENT_TRACKS = 10;
    const userId = req.user?._id?.toString();

    if (!userId) {
      return res.status(400).json({ error: "Usuário não autenticado" });
    }

    try {
      const latestMusics = await recentMusic
        .find({ userId })
        .sort('-updatedAt')
        .limit(MAX_RECENT_TRACKS);

      res.json(latestMusics);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar músicas recentes.' });
    }
  }

  async findFavoriteMusics(req: any, res: any) {
    const MAX_FAVORITE_TRACKS = 10;
    const userId = req.user?._id?.toString();

    if (!userId) {
      return res.status(400).json({ error: "Usuário não autenticado" });
    }

    try {
      const favoritesMusics = await favoriteMusic
        .find({ userId })
        .sort('-createdAt')
        .limit(MAX_FAVORITE_TRACKS);

      res.json(favoritesMusics);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar músicas favoritas.' });
    }
  }

  async removeMusicFavorite(req: any, res: any) {
    const { id } = req.params;
    const { userId } = req.body;

    try {
      const existingFavorite = await favoriteMusic.findOne({ userId, id });
      const deletedMusic = await favoriteMusic.findByIdAndDelete(existingFavorite._id);
      if (!deletedMusic) {
        return res.status(404).json({ error: "Música não encontrada" });
      }

      res.status(200).json({ message: "Música removida dos favoritos" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao excluir a música" });
    }
  }
}
