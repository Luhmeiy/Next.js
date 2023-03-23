import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import styles from "@/styles/MainContainer.module.scss";

export default function MainContainer({ children }: { children: ReactNode }) {
	return (
		<>
			<Navbar />
			<div className={styles.container}>{children}</div>
			<Footer />
		</>
	);
}
