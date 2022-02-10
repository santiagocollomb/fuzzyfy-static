import { ActionFunction, Form, useActionData } from "remix";
import ArtistCardsList from "~/components/ArtistCardsList";
import TrackList from "~/components/TrackList";
import { artistsMock, tracksMock } from "~/helpers/mockdata";
import { SearchError } from "~/helpers/types";
import searchStyles from "../../../styles/search.css";

export const links = () => {
  return [{ rel: "stylesheet", href: searchStyles }];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const query = formData.get("search") as string;

  const errors: SearchError = {};

  if (!query) errors.query = true;
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const artists = artistsMock.filter((artist) => artist.name.includes(query));

  const tracks = tracksMock.filter((track) => track.name.includes(query));

  const items = { artists, tracks };

  return items;
};

const Buscar = () => {
  const errors = useActionData();
  const items = useActionData();
  return (
    <>
      <div className="wrapper">
        <Form method="post" className="search">
          <input
            type="text"
            name="search"
            className="searchTerm"
            placeholder="Busca tus artistas y canciones"
          />
          <button type="submit" className="searchButton">
            Buscar
          </button>
        </Form>
        {errors && errors.query && (
          <span className="error">*Tenés que escribir al menos una letra</span>
        )}
        {items && items.artists && (
          <>
            <h1>Artistas</h1>
            <ArtistCardsList artists={items.artists} />
          </>
        )}
        {items && items.tracks && (
          <>
            <h1 className="mt-2">Canciones</h1>
            <TrackList tracks={items.tracks} />
          </>
        )}
      </div>
    </>
  );
};

export default Buscar;
