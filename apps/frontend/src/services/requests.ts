import axios, { AxiosError } from 'axios'

export const postRequest = async <T>(url: string, dataToSend: any) => {
	try {
		const { data, status } = (await axios.post(url, dataToSend)) as {
			data: T
			status: number
		}

		return { response: data, status: status }
	} catch (er) {
		if (er instanceof AxiosError) {
			throw er
		}
		throw [(er as Error).message]
	}
}

export const getRequest = async <T>(url: string) => {
	try {
		const { data, status } = (await axios.get(url)) as { data: T; status: number }

		return { response: data, status: status }
	} catch (er) {
		if (er instanceof AxiosError) {
			throw er
		}
		throw [(er as Error).message]
	}
}
