import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { getStoredNotes } from '~/data/notes';
import styles from '~/styles/note-details.css';

const NoteDetailsPage = () => {
  const note = useLoaderData();

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  );
};
export default NoteDetailsPage;

export const meta = ({ data }) => {
  return {
    title: data.title,
    description: 'Note data',
  };
};

export const loader = async ({ params }) => {
  const notes = await getStoredNotes();

  //* It is called 'noteId' because of the file name
  const noteId = params.noteId;
  const selectedNote = notes.find((note) => note.id === noteId);

  if (!selectedNote) {
    throw json(
      { message: 'No note found for that id: ' + noteId },
      { status: 404 }
    );
  }

  return selectedNote;
};

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};
