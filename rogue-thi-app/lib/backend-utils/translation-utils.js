const DEEPL_ENDPOINT = process.env.NEXT_PUBLIC_DEEPL_ENDPOINT || ''
const DEEPL_API_KEY = process.env.DEEPL_API_KEY || ''

/**
 * Translates a text using DeepL.
 * @param {String} text The text to translate
 * @param {String} target The target language
 * @returns {String}
 */
async function translate (text, target) {
  if (!DEEPL_ENDPOINT || !DEEPL_API_KEY) {
    console.error('DeepL is not configured. Please set DEEPL_ENDPOINT and DEEPL_API_KEY in your .env.local file. Using fallback translation.')
    return `(TRANSLATION_PLACEHOLDER) ${text}`
  }

  const resp = await fetch(`${DEEPL_ENDPOINT}`,
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `text=${encodeURI(text)}&target_lang=${target}`
    })

  if (resp.status === 200) {
    const result = await resp.json()
    return result.translations.map(x => x.text)[0]
  } else {
    throw new Error('DeepL returned an error: ' + await resp.text())
  }
}

/**
 * Translates all meals in the given plan using DeepL.
 * @param {Object} meals The meal plan
 * @returns {Object} The translated meal plan
 */
export async function translateMeals (meals) {
  return await Promise.all(meals.map(async (day) => {
    const meals = await Promise.all(day.meals.map(async (meal) => {
      return {
        ...meal,
        name: {
          de: meal.name,
          en: await translate(meal.name, 'EN')
        },
        originalLanguage: 'de'
      }
    }))

    return {
      ...day,
      meals
    }
  }))
}
