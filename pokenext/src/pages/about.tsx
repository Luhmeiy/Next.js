import Image from "next/image";
import styles from "@/styles/About.module.scss";

export default function About() {
	return (
		<div className={styles.about}>
			<h1>About</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
				sequi architecto sit accusantium! Numquam illum esse atque, quod
				eligendi repellat quos placeat voluptate debitis porro? Quae
				repellendus rem nobis consequuntur.
			</p>

			<Image
				src="/images/charizard.png"
				width="300"
				height="300"
				alt="Charizard"
			/>
		</div>
	);
}
