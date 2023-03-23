import styles from "@/styles/Home.module.scss";
import Link from "next/link";

export default function Home() {
	return (
		<>
			<main className={styles.main}>
				<ul>
					<li>
						<Link href="products">Produtos</Link>
					</li>
					<li>
						<Link href="about">Sobre</Link>
					</li>
				</ul>
				<h1>Hello World Next.js</h1>
			</main>
		</>
	);
}
