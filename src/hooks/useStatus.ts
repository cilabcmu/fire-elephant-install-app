import { useState } from "react";
import { STATUS } from "../public/type";

export const useStatus = (initStatus: STATUS) => {
    const [status, setStatus] = useState<STATUS>(initStatus);

    const onChangeStatus = (value: STATUS) => setStatus(value)

    return [status, onChangeStatus] as const
}
