import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import abi from './utils/WavePortal.json'
import './App.css'

const App = () => {
  /**
   * ユーザのパブリックウォレットを保存するために使用する状態変数の定義
   */
  const [currentAccount, setCurrentAccount] = useState('')

  // デプロイされたコントラクトのアドレス
  const contractAddress = '0xd5aE441a69ACA12E1B46783a23A38B386826a28e'

  const contractABI = abi.abi

  console.log('currentAccount :', currentAccount)
  /**
   * window.ethereumにアクセスできることを確認
   */
  const checkIfWalletConnected = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        console.log('Make sure you have MetaMask')
      } else {
        console.log('We have the ethereum object', ethereum)
      }
      /**
       * ユーザのwalletへのアクセスが許可されているかの確認
       */
      const accounts = await ethereum.request({ method: "eth_accounts" })
      console.log('accounts', accounts)
      if (accounts.length !== 0) {
        const account = accounts[0]
        console.log('Found an authorized account:', account)
        setCurrentAccount(account)
      } else {
        console.log('No authorized account found')
      }
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * connectWalletメソッド
   */
  const connectWallet = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        alert('Get MetaMask!')
        return
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      })
      console.log('Connected: ', accounts[0])
      setCurrentAccount(accounts[0])
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * waveの回数をアカウント
   */
  const wave = async () => {
    try {
      const { ethereum } = window
      if (ethereum) {
        // provider = MetaMaskを設定
        const provider = new ethers.providers.Web3Provider(ethereum)

        // signer = ユーザのwalletアドレスを抽象化したもの
        // provider.getSigner()を呼び出すだけで、
        // ユーザはwalletアドレスを使用してトランザクションに署名し、
        // そのデータをイーサリアムネットワークに送信できる
        const signer = provider.getSigner()
        // コントラクトへの接続
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )
        let count = await wavePortalContract.getTotalWaves()
        console.log('Retrieved total wave count...', count.toNumber())

        /**
         * コントラクトに👋（wave）を書き込む
         */
        const waveTxn = await wavePortalContract.wave()
        console.log('Mining...', waveTxn.hash)
        await waveTxn.wait()
        console.log('Mined -- ', waveTxn.hash)
        count = await wavePortalContract.getTotalWaves()
        console.log('Retrieved total wave count...', count.toNumber())
      } else {
        console.log('Ethereum object does not exist!')
      }
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * Webページがロードされた時に下記メソッドを実行
   */
  useEffect(() => {
    checkIfWalletConnected()
  }, [])

  return (
    <div className='mainContract'>
      <div className='dataContainer'>
        <div className='header'>
          <span role='img' aria-label='hand-wave'>
            👋
          </span>{' '}
          WELCOME!!
        </div>
        <div className='bio'>
          イーサリアムウォレットを接続して、「
          <span role='img' aria-label='hand-wave'>
            👋
          </span>
          （wave）」を送ってください!
          <span role='img' aria-label='shine'>
            ✨
          </span>
        </div>
        <button className='waveButton' onClick={wave}>
          Wave at Me
        </button>
        {!currentAccount && (
          <button className='waveButton' onClick={connectWallet}>
            connectWallet
          </button>
        )}
        {currentAccount && (
          <button className='waveButton' onClick={connectWallet}>
            walletConnected
          </button>
        )}
      </div>
    </div>
  )
}

export default App
