import styles from "@/styles/Todos.module.scss";
import Link from "next/link";

interface TodoProps {
	id: number;
	title: string;
}

export async function getStaticProps() {
	const data = await fetch("https://jsonplaceholder.typicode.com/todos");

	const todos = await data.json();

	return {
		props: { todos },
	};
}

export default function Todos({ todos }: { todos: TodoProps[] }) {
	return (
		<>
			<h1>Tarefas para fazer:</h1>

			<ul className={styles.todolist}>
				{todos.map((todo) => (
					<li key={todo.id}>
						{todo.title} -{" "}
						<Link href={`/todos/${todo.id}`}>Ver mais</Link>
					</li>
				))}
			</ul>
		</>
	);
}
