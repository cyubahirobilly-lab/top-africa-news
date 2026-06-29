import Layout from '../../../components/Layout/Layout';

export default function EditArticlePage({ id }) {
  return (
    <Layout>
      <h1>Edit article {id}</h1>
      <p>Article editing form will appear here.</p>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      id: params.id
    }
  };
}
