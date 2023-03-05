import React, { createContext, useContext, useEffect, useState } from 'react';
import Staker from "./Staker.json"
import ERC20 from "./ERC20.json"
import { ethers } from 'ethers';

// Context
const MetamaskContext = createContext({});

// Wrapper
export function MetamaskStore(props) {
	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	const [shouldStake, setShouldStake] = useState('Stake And Post');
	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [staker, setStaker] = useState(null);

	useEffect(() => {
		if (defaultAccount) {
			console.log("def acc is", defaultAccount)
			const _provider = new ethers.providers.Web3Provider(window.ethereum)
			const staker = new ethers.Contract(
				"0x56584e18D3a604f002A38C125BeB96f8EC3107bC",
				Staker.abi,
				_provider
			  );

			staker.userStaked(defaultAccount).then((isStaked) => {
				console.log("isstkaed is ", isStaked)
				if (isStaked)
					setShouldStake("Post")
			});


		}
	}, [defaultAccount])

  const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('MetaMask Here!');

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText(result[0]);
				getAccountBalance(result[0]);
				const _provider = new ethers.providers.Web3Provider(window.ethereum)
				setProvider(_provider)
				setSigner(_provider.getSigner())
				setStaker()
			})
			.catch(error => {
				setErrorMessage(error.message);

			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	const submitStake = async () => {
		const _provider = ethers.getDefaultProvider(
			"http://127.0.0.1:3000"
		  )//new ethers.providers.Web3Provider(window.ethereum)

		const erc = new ethers.Contract(
			"0x139e9DF9976E17D1D8AFf50B84793ac35e52662C",
			ERC20.abi,
			_provider.getSigner()
		  );
		const staker = new ethers.Contract(
			"0x56584e18D3a604f002A38C125BeB96f8EC3107bC",
			Staker.abi,
			_provider.getSigner()
		  );

		console.log("trying to stake", staker)

		await erc.approve("0x56584e18D3a604f002A38C125BeB96f8EC3107bC", ethers.utils.parseEther("500000000"));

		await staker.stake();



		console.log("success")
	}

	const paySomeone = async (amount, fallback) => {
		const _provider = new ethers.providers.Web3Provider(window.ethereum)
		const _signer = _provider.getSigner();
		const tx = await _signer.sendTransaction({
			to: "0xC38bbEF74556DB5dF12541f407Caa20f9731DEC1",
			value: ethers.utils.parseEther("0.0001")
		  });

		fallback()
	}

  // update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		getAccountBalance(newAccount.toString());
	}

	const getAccountBalance = (account) => {
		window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			setUserBalance(ethers.utils.formatEther(balance));
		})
		.catch(error => {
			setErrorMessage(error.message);
		});
	};

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}

    return (
        <MetamaskContext.Provider
            value={{
                errorMessage,
                defaultAccount,
                userBalance,
                connButtonText,
				provider,
				shouldStake,
                connectWalletHandler,
                accountChangedHandler,
                getAccountBalance,
                chainChangedHandler,
				submitStake,
				paySomeone
            }}
        >
            {props.children}
        </MetamaskContext.Provider>
    );
}

// Independent
export function useMetamaskContext() {
    return useContext(MetamaskContext);
}
