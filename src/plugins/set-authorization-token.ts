import {userStorage} from '../store/user.ts';
import {api} from "../services";

export default function (): void {
  const token = userStorage.get()?.token
  if (token !== undefined) api.setSecurityData(token)
}
