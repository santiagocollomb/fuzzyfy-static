import { LoaderFunction, useLoaderData } from "remix";
import ArtistCardsList from "~/components/ArtistCardsList";
import TrackList from "~/components/TrackList";
import { artistsMock, tracksMock } from "~/helpers/mockdata";

export const loader: LoaderFunction = () => {
  return {artists: artistsMock, tracks: tracksMock}
}


const Admin = () => {
  const {artists, tracks} = useLoaderData()
  return (
    <>
      <h1 className="mt-2">Tu top de Artistas</h1>
      <ArtistCardsList artists={artists} />
      <h1 className="mt-2">Tu top de Canciones</h1>
      <TrackList tracks={tracks} />
    </>
  );
};

export default Admin;
