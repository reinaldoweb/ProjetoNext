import styles from './styles.module.css';
import Head from 'next/head';

export default function Dashboard() {
    return (
        <div className={styles.container}>

            <head>
                <title>Meu painel de tarefas</title>
            </head>
            <h1>Pagina de painel</h1>
        </div>
    );
}