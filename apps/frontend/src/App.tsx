import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Layout } from './layout/Layout'
import { CreateSecret } from './pages/CreateSecret'
import { Toast } from './components/Toast'

export const App: React.FC = (): React.ReactNode => {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path='/' element={<CreateSecret />} />
				</Routes>
			</Layout>
			<Toast />
		</Router>
	)
}
