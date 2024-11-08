import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import styles from "./styles.module.css";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { Textarea } from "../../components/textarea";
import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

import { db } from "@/services/firebaseConections";
import {
  addDoc,
  collection,
  query,
  orderBy,
  where,
  onSnapshot

} from "firebase/firestore";

interface HomeProps {
  user: {
    email: string;
  }
}

interface TarefasProps {

  id: string;
  created: Date;
  public: boolean;
  tarefa: string;
  user: string


}
export default function Dashboard({ user }: HomeProps) {

  const [input, setInput] = useState("");
  const [publicTask, setPublicTasks] = useState(false);
  const [tarefas, setTarefas] = useState<TarefasProps[]>([]);

  useEffect(() => {
    async function loadTarefas() {
      const tarefasRef = collection(db, "tarefas");
      const q = query(
        tarefasRef,
        where("user", "==", user?.email),
        orderBy("createAt", "desc")

      )
      onSnapshot(q, (snapshot) => {
        let lista = [] as TarefasProps[];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            created: doc.data().createAt,
            public: doc.data().public,
            tarefa: doc.data().tarefa,
            user: doc.data().user
          });

        })
        setTarefas(lista)
      })

    }
    loadTarefas();
  }, [user?.email]);
  function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {
    setPublicTasks(event.target.checked);
  }
  async function handleRegisterTesk(event: FormEvent) {
    event.preventDefault();

    if (input === '') return;
    try {
      await addDoc(collection(db, "tarefas"), {
        tarefa: input,
        createAt: new Date(),
        user: user?.email,
        public: publicTask,

      });

      setInput('');
      setPublicTasks(false);
    } catch (err) {
      console.log("Erro ao cadastrar tarefa", err);
    }
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
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
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

          {tarefas.map((item) => (

            <article key={item.id} className={styles.task}>
              {item.public && (
                <div className={styles.tagContainer}>
                  <label className={styles.tag}>PÚBLICO</label>
                  <button className={styles.shareButton}>
                    <FiShare2 size={20} color="#3183ff" />
                  </button>
                </div>
              )}
              <div className={styles.taskContent}>
                <p>{item.tarefa}</p>
                <button className={styles.trashButton}>
                  <FaTrash size={20} color="#ea3140" />
                </button>
              </div>
            </article>))}
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
      user: {
        email: session?.user?.email,
      }

    },
  };
}