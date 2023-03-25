import Head from "next/head";
import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<Head>
				<link rel="shortcut icon" href="/images/favicon.ico" />
				<title>PokeNext</title>
			</Head>
			<Navbar />
			<main className="main-container">{children}</main>
			<Footer />
		</>
	);
}
