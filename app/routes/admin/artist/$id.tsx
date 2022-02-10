import { LoaderFunction, useLoaderData } from "remix";
import ArtistCardsList from "~/components/ArtistCardsList";
import ProfileHeader from "~/components/ProfileHeader";
import TrackList from "~/components/TrackList";
import {
  artistsMock,
  relatedArtistsMock,
  topTracksMock,
} from "~/helpers/mockdata";
import { Artist, Track } from "~/helpers/types";

export const loader: LoaderFunction = async ({ params }) => {
  const artist = artistsMock.find((artist) => artist.id === params.id);
  const topTracks = topTracksMock.find(
    (topTracks) => topTracks.artistId === params.id
  );
  const relatedArtist = relatedArtistsMock.find(
    (related) => related.artistId === params.id
  );

  const artistTopTracks = topTracks?.artistTopTracks;
  const artistsRelated = relatedArtist?.artistRelated;

  return { artist, artistTopTracks, artistsRelated };
};

const ArtistDetails = () => {
  const {
    artist,
    artistTopTracks,
    artistsRelated,
  }: { artist: Artist; artistTopTracks: Track[]; artistsRelated: any } =
    useLoaderData();

  return (
    <>
      <ProfileHeader
        image={artist.images[0].url}
        title={artist.name}
        subtitle={artist.genres.slice(0, 3).join(" - ")}
        type={artist.type}
      />

      {artistTopTracks && (
        <>
          <h1 className="mt-2">Top de Canciones</h1>
          <TrackList tracks={artistTopTracks.slice(0, 5)} />
        </>
      )}

      {artistsRelated && (
        <>
          <h1 className="mt-2">Artistas relacionados</h1>
          <ArtistCardsList artists={artistsRelated} />
        </>
      )}
    </>
  );
};

export default ArtistDetails;
