module.exports = {
	async calculo(capital, payout) {	
		try{

			const valorEntrada = async () =>{
				const capitalInicial = await ((parseFloat(capital) *  0.77) / 100).toFixed(2)
				return capitalInicial
			}

			const valor = await valorEntrada()

			const lucro = async ()=>{
				const take = await (valor * parseFloat(payout) / 100).toFixed(2)
				return take

			}

			const lucroTake = await lucro()

			const soros1 = ()=>{
				const result =  (parseFloat(valor)+ parseFloat(lucroTake)).toFixed(2)
				return result
			}
			const lucroSoros1 = await  soros1()

			const soros2 = async ()=>{
				const result = ((parseFloat(lucroSoros1) * payout) / 100).toFixed(2)
				return result
			}
			const lucroSoros2 = await soros2()
			const soros3 = ()=>{
				const result = ((parseFloat(lucroSoros2) * payout) / 100).toFixed(2)
				return result

			}
			const lucroSoros3 = await soros3()
			const ResultSoros3 = ()=>{
				const result = ((parseFloat(lucroSoros3) * payout) / 100).toFixed(2)
				return result

			}

			const prejuizo1Ordem  = async () =>{
				return valor
			}

			const martingale1 = ()=>{
				
				const result = ((parseFloat(valor) / payout) * 100).toFixed(2)
				return result
			}

			const resultadoMartinGale1 = await martingale1()
			const prejuizoGale1 = async () =>{
				const result = (parseFloat(valor)+ parseFloat(resultadoMartinGale1)).toFixed(2)
				return result
			}
			const martingale2 = ()=>{
				const result = (((parseFloat(valor) + parseFloat(resultadoMartinGale1))/ payout) * 100).toFixed(2)
				return result
			}
			const resultadoMartinGale2= await martingale2()

			const prejuizoGale2 = async () =>{
				const result = (parseFloat(valor)+ parseFloat(resultadoMartinGale1) +parseFloat(resultadoMartinGale2)).toFixed(2)
				return result
			}
			const [entradaInicial, lucroGain, soros, nivel2, nivel3,lucroNivel3, gale1, gale2, lossOrdem1, lossGale1, lossGale2] =  await Promise.all([
				valorEntrada(),
				lucro(),
				soros1(),
				soros2(),
				soros3(),
				ResultSoros3(),
				martingale1(),
				martingale2(),
				prejuizo1Ordem(),
				prejuizoGale1(),
				prejuizoGale2()
				])

			let result=  {}

			result.entrada =  entradaInicial
			result.soros = soros
			result.soros2 = nivel2
			result.soros3 = nivel3
			result.lucroNivel3 = lucroNivel3
			result.gale1 = gale1
			result.gale2 = gale2
			result.lossOrdem1 = lossOrdem1
			result.lossGale1 = lossGale1
			result.lossGale2 = lossGale2
			return result

		} catch(err){
			return err
		}

	}
}