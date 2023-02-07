import { useEffect, useState } from "react"


export const UseMetaMask = () => {
    const [currentAccount, setCurrentAccount] = useState("")
    const [accounts, setAccounts] = useState([])
    const [isConnected, setIsConnected] = useState(false)

    const isMetaMaskInstalled = () => {
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask)
    };

    const connectMetaMesk = async () => {
        if (!isMetaMaskInstalled()){
            alert("You need install MetaMask")
        }
        try {
            const accountData = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accountData)
            console.log(accountData)
        } catch (error){
            console.error(error)
        }
    };

    useEffect(() => {
        if (accounts && accounts.length) return
        const checkConnect = async () => {
            try{
                const accountsData = await window.ethereum.request({ method: "eth_accounts"})
                if (accountsData && accountsData.length){
                    const [current] = accountsData
                    console.log("Conta atual", current)
                    setCurrentAccount(current)
                    setAccounts(accountsData)
                    setIsConnected(true)
                }
            }catch (error){
                console.error(error)
            }
        }
        checkConnect()

    }, [accounts])

    return { isConnected, currentAccount, connectMetaMesk };

}