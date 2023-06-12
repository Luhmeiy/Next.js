export interface MessageData {
	id: string;
	text: string;
	expand: {
		user: {
			username: string;
			id: string;
		};
	};
}
