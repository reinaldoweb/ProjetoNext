import  {ChangeEvent, FormEvent, useState } from "react";
import { GetServerSideProps } from "next";
import styles from "./styles.module.css";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { Textarea } from "../../components/textarea";
import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

export default function Dashboard() {

const [input, setInput] = useState("");
const [publicTask, setPublicTasks] = useState(false);


function handleChangePublic(event:ChangeEvent<HTMLInputElement>){
  setPublicTasks(event.target.checked);
  }
  function handleRegisterTesk(event: FormEvent){
  event.preventDefault();

    if (input === '') return;
    alert('TESTE');
}



  return (
    <div className={styles.container}>
      <Head>
        <title>Meu painel de tarefas</title>
      </Head>

      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>Qual sua tarefa?</h1>
            <form onSubmit={handleRegisterTesk}>
              <Textarea
              value={input}
              onChange={(e:ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
                placeholder="Digite sua tarefa" />
              <div className={styles.checkboxArea}>
                <input
                type="checkbox"
                className={styles.checkbox}
                checked={publicTask}
                onChange={handleChangePublic}
                />
                <label htmlFor="">Deixar tarefa publica</label>
              </div>
              <button className={styles.button} type="submit">
                Registrar
              </button>

            </form>

          </div>
        </section>
        <section className={styles.taskContainer}>
          <h1>Minhas tarefas</h1>

          <article className={styles.task}>
            <div className={styles.tagContainer}>
              <label className={styles.tag}>PÚBLICO</label>
              <button className={styles.shareButton}>
                <FiShare2 size={20} color="#3183ff" />
              </button>
            </div>
            <div className={styles.taskContent}>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus aperiam ipsum est, error sed exercitationem rem in suscipit sequi assumenda, vel nesciunt quaerat veritatis, quisquam voluptas repellat provident reiciendis impedit!</p>
            <button className={styles.trashButton}>
            <FaTrash size={20} color="#ea3140" />
            </button>
            </div>
          </article>
        </section>

      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {

    props: {

    },
  };
}