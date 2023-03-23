import MainContainer from "@/components/MainContainer";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<MainContainer>
			<Component {...pageProps} />
		</MainContainer>
	);
}
