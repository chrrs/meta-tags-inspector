
const App: React.FC = () => {
	const [_, forceUpdate] = useReducer((x) => x + 1, 0);
	const [meta] = useState(new Meta());

	useEffect(() => {
		const port = chrome.runtime.connect();

		port.onMessage.addListener((message: [string, any]) => {
			meta.update(message[1] ?? {});
			forceUpdate();
		});

		port.postMessage(['init', { tabId: chrome?.devtools?.inspectedWindow?.tabId }]);

		return () => port.disconnect();
	}, [meta]);

	return (
		<>
		</>
	);
};

export default App;
