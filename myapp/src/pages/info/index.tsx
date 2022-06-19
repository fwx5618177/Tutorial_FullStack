import { Button } from "antd"
import { useState } from "react"
import { errorInfo } from "../../errorMonitor/error"
import "./style.css"

export default (() => {
    const [imgs, setImgs] = useState<string[]>([])

    const handleClick = () => {
        const a = 1
        // a[0] = 2

        // @ts-ignore
        a.b.c = 1
    }

    const handleShowError = () => {
        const re = errorInfo

        console.log(re)
        if (re.length >0 && Array.isArray(re) && !!re) {
            setImgs(re)
        } else {
            setImgs([])
        }
    }

    return (<>
        <Button type="primary" onClick={handleClick}>Click</Button>
        
        <div>
            <Button type="primary" onClick={handleShowError}>Show Error</Button>
            <div className="images">{imgs?.map((ci, index) => (
                <img src={ci.replace(/[\r\n]/g, "")} key={index + '_imag'} />
            ))}</div>
        </div>
    </>)
})