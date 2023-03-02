import React, { useContext } from 'react'

import AppBody from '../components/page/AppBody'
import AppContainer from '../components/page/AppContainer'
import AppNavbar from '../components/page/AppNavbar'
import AppTabbar from '../components/page/AppTabbar'
import BaseCard from '../components/cards/BaseCard'
import CalendarCard from '../components/cards/CalendarCard'
import EventsCard from '../components/cards/EventsCard'
import FoodCard from '../components/cards/FoodCard'
import InstallPrompt from '../components/cards/InstallPrompt'
import MobilityCard from '../components/cards/MobilityCard'
import PersonalizeModal from '../components/modal/PersonalizeModal'
import TimetableCard from '../components/cards/TimetableCard'

import {
  faBook,
  faDoorOpen, faGear,
  faScroll,
  faUser,
  faUserGraduate
} from '@fortawesome/free-solid-svg-icons'

import { useDashboard } from '../lib/hooks/dashboard'

import styles from '../styles/Home.module.css'

import { ShowPersonalizeModal } from './_app'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const CTF_URL = process.env.NEXT_PUBLIC_CTF_URL

export const PLATFORM_DESKTOP = 'desktop'
export const PLATFORM_MOBILE = 'mobile'
export const USER_STUDENT = 'student'
export const USER_EMPLOYEE = 'employee'
export const USER_GUEST = 'guest'
export const ALL_DASHBOARD_CARDS = [
  {
    key: 'install',
    label: 'Installation',
    default: [PLATFORM_MOBILE, USER_STUDENT, USER_EMPLOYEE, USER_GUEST],
    card: hidePromptCard => (
      <InstallPrompt
        key="install"
        onHide={() => hidePromptCard('install')}
      />
    )
  },
  {
    key: 'timetable',
    label: 'Stundenplan',
    default: [PLATFORM_DESKTOP, USER_STUDENT, USER_EMPLOYEE],
    card: () => <TimetableCard key="timetable"/>
  },
  {
    key: 'mensa',
    label: 'Essen',
    default: [PLATFORM_DESKTOP, USER_STUDENT, USER_EMPLOYEE, USER_GUEST],
    card: () => <FoodCard key="mensa"/>
  },
  {
    key: 'mobility',
    label: 'Mobilität',
    default: [PLATFORM_DESKTOP, PLATFORM_MOBILE, USER_STUDENT, USER_EMPLOYEE, USER_GUEST],
    card: () => <MobilityCard key="mobility"/>
  },
  {
    key: 'calendar',
    label: 'Termine',
    default: [PLATFORM_DESKTOP, PLATFORM_MOBILE, USER_STUDENT, USER_EMPLOYEE, USER_GUEST],
    card: () => <CalendarCard key="calendar"/>
  },
  {
    key: 'events',
    label: 'Veranstaltungen',
    default: [PLATFORM_DESKTOP, PLATFORM_MOBILE, USER_STUDENT, USER_EMPLOYEE, USER_GUEST],
    card: () => <EventsCard key="events"/>
  },
  {
    key: 'rooms',
    label: 'Raumplan',
    default: [PLATFORM_DESKTOP, USER_STUDENT, USER_EMPLOYEE, USER_GUEST],
    card: () => (
      <BaseCard
        key="rooms"
        icon={faDoorOpen}
        title="Räume"
        link="/rooms"
      />
    )
  },
  {
    key: 'library',
    label: 'Bibliothek',
    default: [PLATFORM_DESKTOP, USER_STUDENT],
    card: () => (
      <BaseCard
        key="library"
        icon={faBook}
        title="Bibliothek"
        link="/library"
      />
    )
  },
  {
    key: 'grades',
    label: 'Noten & Fächer',
    default: [PLATFORM_DESKTOP, PLATFORM_MOBILE, USER_STUDENT],
    card: () => (
      <BaseCard
        key="grades"
        icon={faScroll}
        title="Noten & Fächer"
        link="/grades"
      />
    )
  },
  {
    key: 'personal',
    label: 'Profil',
    default: [PLATFORM_DESKTOP, PLATFORM_MOBILE, USER_STUDENT, USER_EMPLOYEE, USER_GUEST],
    card: () => (
      <BaseCard
        key="personal"
        icon={faUser}
        title="Profil"
        link="/personal"
      />
    )
  },
  {
    key: 'lecturers',
    label: 'Dozenten',
    default: [PLATFORM_DESKTOP, PLATFORM_MOBILE, USER_STUDENT, USER_EMPLOYEE],
    card: () => (
      <BaseCard
        key="lecturers"
        icon={faUserGraduate}
        title="Dozenten"
        link="/lecturers"
      />
    )
  }
]

/**
 * Main page.
 */
export default function Home () {
  // page state
  const {
    shownDashboardEntries,
    hideDashboardEntry
  } = useDashboard()
  const [, setShowPersonalizeModal] = useContext(ShowPersonalizeModal)

  return (
    <AppContainer>
      <AppNavbar title="neuland.app" showBack={false}>
        <AppNavbar.Button onClick={() => setShowPersonalizeModal(true)}>
          <FontAwesomeIcon title="Einstellungen" icon={faGear} fixedWidth />
        </AppNavbar.Button>
      </AppNavbar>

      <AppBody>
        <div className={styles.cardDeck}>
          {shownDashboardEntries.map(entry => entry.card(hideDashboardEntry))}
          <PersonalizeModal/>
        </div>
      </AppBody>

      <PersonalizeModal />
      <AppTabbar/>
    </AppContainer>
  )
}
