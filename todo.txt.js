	const linksEnterHandler = (e) => {

		/*
		SPRAWDZIĆ CZY TO JEST PIERWSZE NAJECHANIE NA JAKIKOLWIEK LINK CZY
		PRZECHODZI ON Z POPRZEDNIEGO LINKU:

			JEŚLI JEST TO PIERWSZE TO:
				WYŁĄCZYĆ:
					wszystkie linki oprócz tego, który jest aktywny(mouseenter)
					sekcja kontaktowa z lewego dolnego rogu
					animacje tła w tle na ruszanie myszki
				WŁĄCZYĆ:
					animacje przejścia zdjęcia - type1 aka 'Clip path'
				USTAWIĆ:
					state isNewFirstImgEntry jako taki, który dostał już
						pierwsze wejśćie, a każde inne będzie przenosiło do
						stanu KOLEJNEGO PRZEJŚCIA (state = 1)

			JEŚLI JEST TO KOLEJNE PRZEJŚCIE TO
				WŁĄCZYĆ:
					animacja przejścia między jednym a drugim zdjęciem - type2 aka 'Opacity / Blur'
				
				JEŚLI CZĘŚĆ KONTENTU ZOSTAŁA JUŻ WŁĄCZONA (timeout 1s state):
				(ustawić jakiś generalnie state na kontrolowanie tego dla prostoty i czytelnosci)
					WYŁĄCZYĆ
						wyłączyć ponownie kontent który został odkryty

				ZMIENIĆ:
					usunąć timeout z linksLeaveHandler
		*/

		// console.log(e, excludedLinks, imgIndex)
	}

	const linksLeaveHandler = e => {
		/*
		USTAWIĆ TIMEOUT NA DAJMY NA TO 2 SEKUNDY:
			PO UPŁYWIE CZASU:
				1 SEKUNDA:
					WŁĄCZYĆ:
						wszystkie linki oprócz tego, który jest aktywny(mouseenter) bo już jest aktywny duuh
						sekcja kontaktowa z lewego dolnego rogu
				2 SEKUNDY:
					WŁĄCZYĆ:
						animacje tła w tle na ruszanie myszki
					WYŁĄCZYĆ:
						aktywne zdjęcie - type1 ala 'Clip path
		 */
	}

	const linksListLeaveHandler = e => {
		/*
		NATYCHMIASTOWO:
			WŁĄCZYĆ:
						wszystkie linki oprócz tego, który jest aktywny(mouseenter) bo już jest aktywny duuh
						sekcja kontaktowa z lewego dolnego rogu
						animacje tła w tle na ruszanie myszki
			WYŁĄCZYĆ:
				aktywne zdjęcie - type1 ala 'Clip path
				timeout z linksLeaveHandler'a
			USTAWIĆ:
					state isNewFirstImgEntry jako taki, który może dostać
						ponownie pierwsze wejście (state = 0)
		*/
	}
