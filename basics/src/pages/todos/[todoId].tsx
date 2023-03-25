import Link from "next/link";

interface ContextProps {
	params: {
		todoId: string;
	};
}

interface TodoProps {
	id: number;
	title: string;
}

export async function getStaticProps(context: ContextProps) {
	console.log(typeof context);
	const { params } = context;

	const data = await fetch(
		`https://jsonplaceholder.typicode.com/todos/${params.todoId}`
	);

	const todo = await data.json();

	return { props: { todo } };
}

export async function getStaticPaths() {
	const response = await fetch("https://jsonplaceholder.typicode.com/todos");

	const data = await response.json();

	const paths = data.map((todo: TodoProps) => {
		return {
			params: {
				todoId: `${todo.id}`,
			},
		};
	});

	return { paths, fallback: false };
}

export default function Todo({ todo }: { todo: TodoProps }) {
	return (
		<>
			<Link href="/">Voltar</Link>

			<h1>Exibindo o todo: {todo.id}</h1>
			<h3>Texto: {todo.title}</h3>

			<p>
				Comentário: lalala...{" "}
				<Link href={`/todos/${todo.id}/comments/1`}>Detalhes</Link>
			</p>

			<p>
				Comentário: lelele...{" "}
				<Link href={`/todos/${todo.id}/comments/2`}>Detalhes</Link>
			</p>

			<p>
				Comentário: lilili...{" "}
				<Link href={`/todos/${todo.id}/comments/3`}>Detalhes</Link>
			</p>
		</>
	);
}
