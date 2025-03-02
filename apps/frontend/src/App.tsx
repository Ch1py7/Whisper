import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Toast } from './components/Toast'
import { Layout } from './layout/Layout'
import { CreateSecret } from './pages/CreateSecret'
import { ListSecrets } from './pages/ListSecrets'

export const App: React.FC = (): React.ReactNode => {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path='/' element={<CreateSecret />} />
					<Route path='/secrets' element={<ListSecrets />} />
				</Routes>
			</Layout>
			<Toast />
		</Router>
	)
}
