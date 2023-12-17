import API from '../backend/authenticated-api'
import { combineDateTime } from '../date-utils'
import { getNextValidDate } from './rooms-utils'

/**
 * Extracts regular, short and full names for a lecture.
 * @param {object} item Timetable item
 * @returns {object}
 */
export function getTimetableEntryName(item) {
  const match = item.shortName.match(/^[A-Z]{2}\S*/)
  if (match) {
    const [shortName] = match
    return {
      name: item.name,
      shortName,
    }
  } else {
    // fallback for weird entries like
    //    "veranstaltung": "„Richtige Studienorganisation und Prüfungsplanung“_durchgeführt von CSS und SCS",
    //    "fach": "fiktiv für Raumbelegung der Verwaltung E",
    const name = `${item.shortName} - ${item.name}`
    const shortName = name.length < 10 ? name : name.substr(0, 10) + '…'
    return {
      name,
      shortName,
    }
  }
}

/**
 * Get all gaps between lectures.
 * Each gap is an object with a start and end date as well as start and end lecture.
 * @param {object[]} timetable Timetable
 * @returns {object[]}
 **/
export function getTimetableGaps(timetable) {
  let gaps = []
  for (let i = 0; i < timetable.length - 1; i++) {
    const gap = {
      startDate: timetable[i].endDate,
      endDate: timetable[i + 1].startDate,
      startLecture: timetable[i],
      endLecture: timetable[i + 1],
    }

    gaps.push(gap)
  }

  if (new Date().getTime() < timetable[0].startDate.getTime()) {
    // add gap between now and first lecture
    gaps.unshift({
      startDate: getNextValidDate(),
      endDate: timetable[0].startDate,
      endLecture: timetable[0],
    })
  }

  gaps.forEach((x) => {
    // substract 10 minutes for valid room times
    x.endDate.setMinutes(x.endDate.getMinutes() - 10)
  })

  // filter out gaps that are too short (<= 10 minutes) (10 minute are already substracted => 0)
  gaps = gaps.filter((x) => x.endDate - x.startDate > 0)

  return gaps
}

/**
 * Fetches and parses timetable data.
 * @param {Date} date Date to fetch
 * @param {boolean} detailed Fetch lecture descriptions
 * @returns {object[]}
 */
export async function getFriendlyTimetable(date, detailed) {
  const { timetable } = await API.getTimetable(date, detailed)

  /**
   * During the semester break, the API returns an null array ('[null]').
   * To prevent errors for the room suggestions or the timetable view, we return an empty array.
   */
  if (timetable.every((x) => x === null)) {
    console.error('API returned null array for timetable!')
    return []
  }

  return timetable
    .flatMap((day) =>
      Object.values(day.hours).flatMap((hours) =>
        hours.map((hour) => ({ date: day.date, ...hour }))
      )
    )
    .map((x) => {
      const startDate = combineDateTime(x.date, x.von)
      const endDate = combineDateTime(x.date, x.bis)

      // normalize room order
      let rooms = []
      if (x.details.raum) {
        rooms = x.details.raum
          .split(',')
          .map((x) => x.trim().toUpperCase())
          .sort()
      }

      return {
        date: x.date,
        startDate,
        endDate,
        name: x.details.fach,
        shortName: x.details.veranstaltung,
        rooms,
        lecturer: x.details.dozent,
        exam: x.details.pruefung,
        course: x.details.stg,
        studyGroup: x.details.stgru,
        sws: x.details.sws,
        ects: x.details.ectspoints,
        objective: x.details.ziel,
        contents: x.details.inhalt,
        literature: x.details.literatur,
      }
    })
    .filter((x) => x.endDate > date)
    .sort((a, b) => a.startDate - b.startDate)
}
