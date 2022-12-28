import styles from './NewNote.css';
import {
  Form,
  useActionData,
  useTransition as useNavigation,
} from '@remix-run/react';

const NewNote = () => {
  const navigation = useNavigation();

  //* This is how to get the data from the action function. Any component that is rendered by the notes.js route will have access to the data returned from the action function
  const data = useActionData();

  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method="post" id="note-form">
      {data?.message && <p>{data.message}</p>}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows="5" required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Note'}
        </button>
      </div>
    </Form>
  );
};

export default NewNote;

// For styles to work here, look at the snippet from my-remix-app\app\routes\notes.js
export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
