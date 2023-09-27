"use client";

import {
	useSessionContext,
	useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";

import { useAuthModal } from "@/hooks/useAuthModal";

import { Modal } from "./Modal";

export const AuthModal = () => {
	const router = useRouter();

	const { session } = useSessionContext();
	const { onClose, isOpen } = useAuthModal();
	const supabaseClient = useSupabaseClient();

	useEffect(() => {
		console.log(session);

		if (session) {
			console.log(true);
			router.refresh();
			onClose();
		}
	}, [session, router, onClose]);

	const onChange = (open: boolean) => {
		if (!open) {
			onClose();
		}
	};

	return (
		<Modal
			title="Welcome back"
			description="Login to your account"
			isOpen={isOpen}
			onChange={onChange}
		>
			<Auth
				supabaseClient={supabaseClient}
				providers={["github"]}
				magicLink
				theme="dark"
				appearance={{
					theme: ThemeSupa,
					variables: {
						default: {
							colors: {
								brand: "#404040",
								brandAccent: "#22c55e",
							},
						},
					},
				}}
			/>
		</Modal>
	);
};
