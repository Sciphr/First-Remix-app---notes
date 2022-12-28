import { json, redirect } from '@remix-run/node';
import { Link, useLoaderData, useCatch } from '@remix-run/react';
import NewNote, { links as newNoteLinks } from '~/components/NewNote';
import NoteList, { links as noteListLinks } from '~/components/NoteList';
import { getStoredNotes, storeNotes } from '~/data/notes';

const NotesPage = () => {
  //*This is how to get the data from the loader function
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
};
export default NotesPage;

export const loader = async () => {
  const notes = await getStoredNotes();

  if (!notes || notes.length === 0) {
    throw json(
      { message: 'No notes found' },
      { status: 404, statusText: 'Not Found' }
    );
  }

  //*This is the most basic way to return JSON data
  return notes;

  //*One way to return JSON data is to use the Response object from @remix-run/node
  // return new Response(JSON.stringify(notes), {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });

  //*Another way to return JSON data is to use the json() function from @remix-run/node
  // return json(notes);
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  //This extracts the data from the form. In this case, it would be: noteData.content, and noteData.title
  const noteData = Object.fromEntries(formData);

  if (noteData.title.trim().length < 5) {
    return { message: 'Title must be greater than 5 characters' };
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000)); This is just making the request take longer to see the loading state
  return redirect('/notes');
};

export const links = () => {
  return [...newNoteLinks(), ...noteListLinks()];
};

export const meta = () => {
  return {
    title: 'Jacob Berry Notes Remix App!',
    description: 'A list of notes',
  };
};

//* Errors that are 'thrown' are caught by this CatchBoundary component
export const CatchBoundary = ({ error }) => {
  const caughtResponse = useCatch();

  const message = caughtResponse.data?.message || 'Data not found';

  return (
    <main>
      <NewNote />
      <p className="info-message">{message}</p>
    </main>
  );
};

//* Errors that are NOT thrown are caught by this ErrorBoundary component
export const ErrorBoundary = ({ error }) => {
  return (
    <main className="error">
      <h1>An error related to your notes has occurred!</h1>
      <p>{error.message}</p>
      <p>
        Back to <Link to="/">safety</Link>!
      </p>
    </main>
  );
};
