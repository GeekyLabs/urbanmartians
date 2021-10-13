import Head from 'next/head'
import Navbar from './Components/Navbar.js';
import Footer from './Components/Footer.js';
import Web3 from "web3";
import { useState, useEffect } from 'react';
import {ADDRESS, ABI} from "../config.js"


export default function Mint() {

// FOR WALLET
const [signedIn, setSignedIn] = useState(false)

const [walletAddress, setWalletAddress] = useState(null)

// FOR MINTING
const [how_many_martians, set_how_many_martians] = useState(1)

const [martianContract, setMartianContract] = useState(null)

// INFO FROM SMART Contract

const [totalSupply, setTotalSupply] = useState(0)

const [saleStarted, setSaleStarted] = useState(false)

const [martianPrice, setMartianPrice] = useState(0)

useEffect( async() => { 

  signIn()

}, [])

async function signIn() {
  if (typeof window.web3 !== 'undefined') {
    // Use existing gateway
    window.web3 = new Web3(window.ethereum);
   
  } else {
    alert("No Ethereum interface injected into browser. Read-only access");
  }

  window.ethereum.enable()
    .then(function (accounts) {
      window.web3.eth.net.getNetworkType()
      // checks if connected network is mainnet (change this to rinkeby if you wanna test on testnet)
      .then((network) => {console.log(network);if(network != "main"){alert("You are on the " + network+ " network. Change network to main or you won't be able to do anything here !")} });  
      let wallet = accounts[0]
      setWalletAddress(wallet)
      setSignedIn(true)
      callContractData(wallet)

})
.catch(function (error) {
// Handle error. Likely the user rejected the login
console.error(error)
})
}

//

async function signOut() {
  setSignedIn(false)
}

async function callContractData(wallet) {
   //let balance = await web3.eth.getBalance(wallet);//
   //setWalletBalance(balance)//
  const martianContract = new window.web3.eth.Contract(ABI, ADDRESS)
  setMartianContract(martianContract)

  const salebool = await martianContract.methods.saleIsActive().call() 
  // console.log("saleisActive" , salebool)
  setSaleStarted(salebool)

  const totalSupply = await martianContract.methods.totalSupply().call() 
  setTotalSupply(totalSupply)

  const martianPrice = await martianContract.methods.martianPrice().call() 
  setMartianPrice(martianPrice)
 
}

async function mintMartian(how_many_martians) {
  if (martianContract) {

    const price = Number(martianPrice)  * how_many_martians 

    const gasAmount = await martianContract.methods.mintUrbanMartian(how_many_martians).estimateGas({from: walletAddress, value: price})
    console.log("estimated gas",gasAmount)

    console.log({from: walletAddress, value: price})

    martianContract.methods
          .mintUrbanMartian(how_many_martians)
          .send({from: walletAddress, value: price, gas: String(gasAmount)})
          .on('transactionHash', function(hash){
            console.log("transactionHash", hash)
          })
        
  } else {
      console.log("Wallet not connected")
  }
  
};

  return (
    <div id="bodyy" content="../images/drops.png" className="font-gluten antialiased bg-gradient-to-r from-blue-400 via-teal-500 to-blue-400">
      <Head>
        <title>UrbanMartians</title>
        <link rel="icon" href="/images/example.gif"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta property="og:title" content="Quonks" key="ogtitle" />
        <meta property="og:description" content="" key="ogdesc" />
        <meta property="og:type" content="website" key="ogtype" />
        <meta property="og:url" content="https://urbanmartians.net/" key="ogurl"/>
        <meta property="og:image" content="https://urbanmartians.net/images/gang2.png.png" key="ogimage"/>
        <meta property="og:site_name" content="https://urbanmartians.net/" key="ogsitename" />
        <meta name="twitter:card" content="summary_large_image" key="twcard"/>
        <meta property="twitter:domain" content="https://www.twitter.com/CryptoQuonks" key="twdomain" />
        <meta property="twitter:url" content="https://urbanmartians.net/" key="twurl" />
        <meta name="twitter:title" content="Quonks" key="twtitle" />
        <meta name="twitter:description" content="" key="twdesc" />
        <meta name="twitter:image" content="https://urbanmartians.net/gang2.png" key="twimage" />
      </Head>

      <div >
            <Navbar/>
          </div>

  <div className="px-4 py-12 rounded-lg" id="minter">
    <div className="max-w-3xl items-center  rounded-lg mx-auto bg-blue-400  border-4 border-black p-16 text-center border-solid ">
  
    <div className="max-w-xl rounded-lg  border-solid border-4 border-black bg-black mx-auto my-0  text-center">
    <div className="cards-image-mask"><img src="../images/gang2.png" width="1000px" alt="" className="cards-image" /></div>
   </div> 
   <br/> <h1 className="text-xl font-large mb-2 font-bold text-black">Welcome To:<br/></h1>
    <h1 className="text-5xl font-large mb-0 font-bold text-black">Urban<br/> Martians!<br/></h1>
   <br/> <h1 className="text-xl font-large mb-2 font-bold text-black">(They come in peace)<br/></h1>
    
       </div></div>

       <div className="px-4" id="about">
          <div className="max-w-3xl border-solid bg-blue-400 border-4 border-black  rounded-full mx-auto my-0 p-12 text-center">
          {!signedIn ? <button onClick={signIn} className="montserrat  inline-block border-2 border-black rounded-full bg-white border-opacity-100   px-3 no-underline  py-2  shadow-lg hover:bg-blue-500 hover:-gray-100">Connect to Metamask</button>
            :
            <button onClick={signOut} className="montserrat items-center border-solid inline-block border-2 rounded-full px-3 py-2 border-black bg-white border-opacity-100 no-underline  shadow-sm hover:bg-blue-500 hover:text-gray-100 ">Wallet Connected:</button>}
           <br/> <br/>
           <h1 className="text-lg font-large mb-2 text-black">Wallet: </h1>{walletAddress}
          <br/><br/> <span className="inline-block text-3xl text-allign border-4 bg-gray-300 border-black rounded-full px-8 my-1 "><br/>MARTIANS<br/>MINTED:  <span className="text-indigo-500  text-med"><pre/> {!signedIn ?  <>-</>  :  <>{totalSupply}</> } / 3000<br/><br/></span></span>
     <br/><br/> <h1 className="text-lg font-large mb-2 text-black">PRICE: </h1>
      <h1 className="text-2xl font-large mb-2 text-blue-700"> 0.025 ETH </h1>
      <h1 className="text-lg font-large mb-2 text-black"><br/> Max Tx Size: <br/></h1>
      <h1 className="text-2xl font-large mb-2 text-blue-700"> 5 </h1>
     

      <div className=" inline-block md:w-2/3 w-4/5 text-sm">
           
                
          <div className=" border-b-2 py-3">
            
            <div className="flex flex-col items-center">
              <div className="inline-block text-sm text-allign">
              </div>

                <div id="mint" className="   ">
                  <span className=" text-4xl text-black  bg-grey-lighter  font-bold">MINT:<br/></span><br/>
                    
                    
                        <br/> 
                  <input 
                                      type="number" 
                                      min="1"
                                      max="5"
                                      value={how_many_martians}
                                      onChange={ e => set_how_many_martians(e.target.value) }
                                      name="" 
                                      className=" pl-4 text-4xl  inline bg-grey-lighter  border-black border-4  rounded-full text-grey-darkest  font-bold"
                                  />
                   <div className="flex flex-col items-center">
                  <span className="flex text-2xl text-center text-black items-center bg-grey-lighter rounded rounded-r-none px-12 font-bold"><br/>Martian(s) <br/>for {(martianPrice * how_many_martians) / (10 ** 18)} ETH + GAS<br/></span>
                   </div>
                </div><br/>
                {saleStarted ? 
                 <button onClick={() => mintMartian(how_many_martians)} className=" text-4xl border-2 border-black bg-white rounded-full text-black hover:text-blue-500 hover:bg-gray-400 p-2 ">MINT!</button>        
                  : <button className="  text-3xl border-4 bg-white   text-black hover:text-black p-2 ">SALE IS NOT ACTIVE OR NO WALLET IS CONNECTED</button>        
            
              } 
          </div>
          </div>      
            </div> 
            </div>
        </div>

          <br/><br/>  

<div className="px-4" id="about">
 <div className="max-w-4xl border-solid bg-blue-400 border-4 border-black  rounded-lg mx-auto my-0 p-8 text-center">
           <br/>
           <div className="max-w-6xl rounded-lg  border-solid border-4 border-light-blue-500 bg-black mx-auto my-0  text-center">
            <a href="#about" className=""><img src="../images/gang3.png"  width="1200" alt="" /></a>
            </div><br/>
    <h1 className="text-3xl font-larh mb-2 text-black"> Urban Martians? <br/></h1><br/>
    <p className="text-xl md:text-2xl font-large mb-2 text-black"> The Struggle is real... <br/></p><br/>
      <p className="text-lg md:text-xl font-large mb-2 text-black"> The Urban Martians once lived a free, happy life as any Hipster Martian should... Until they were unexpectedly cancelled by the GWEI meteor. <br/></p><br/>
      <p className="text-lg md:text-xl font-large mb-2 text-black">This cataclysmic event, forced the Urban Martians to the deepest depths of underground Mars, where unfortunately, there is little to no Ethereum left to power their Kambucha & Guac Machines.</p>
     <br/> <p className="text-lg md:text-xl font-large mb-2 text-black">With no way of getting back to the surface of Mars to mine some Ethereum, it seems like there is no "good vibes" left in sight for these once proud beings to slay. </p>
     <br/> <p className="text-lg md:text-xl font-large mb-2 text-black">The Urban Martians ultimate goal, is to work together, and  they feel that with your help, they can get enough Ethereum to power their food aparatuses so they can atleast survive the next wave of "bad vibes". </p>
     <br/> <p className="text-lg md:text-xl font-large mb-2 text-black">Do you have what it takes to save the Urban Martians? Because they "Cant Even", anymore. </p>
 
      
       </div></div>   <br/><br/>
<Footer/>
     </div>  
    
    )
  }