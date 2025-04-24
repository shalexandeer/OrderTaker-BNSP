import {
  // IconApps,
  // IconBarrierBlock,
  // IconBoxSeam,
  // IconChartHistogram,
  // IconChecklist,
  // IconComponents,
  // IconError404,
  // IconExclamationCircle,
  // IconHexagonNumber1,
  // IconHexagonNumber2,
  // IconHexagonNumber3,
  // IconHexagonNumber4,
  // IconHexagonNumber5,
  IconLayoutDashboard,
  // IconMessages,
  // IconRouteAltLeft,
  // IconServerOff,
  // IconSettings,
  // IconTruck,
  // IconUserShield,
  IconUsers,
  // IconLock,
  // IconUserHeart,
  // IconTimelineEventPlus,
  IconDiscount2,
  IconDiscountCheck,
  IconBuildingStore,
  IconTimelineEventPlus,
  IconBarrierBlock,
  IconDeviceGamepad2,
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Referrals',
    href: '/referrals',
    icon: <IconDiscountCheck size={18} />,
  },
  {
    title: 'Vouchers',
    href: '/vouchers',
    icon: <IconDiscount2 size={18} />,
  },
  {
    title: 'Users',
    label: '',
    href: '/users',
    icon: <IconUsers size={18} />,
  },
  {
    title: 'Events',
    label: '',
    href: '/events',
    icon: <IconTimelineEventPlus size={18} />,
  },
  {
    title: 'Item Mall',
    label: '',
    href: '/shop',
    icon: <IconBuildingStore size={18} />,
  },
  {
    title: 'Blocked Username',
    label: '',
    href: '/blocked-username',
    icon: <IconBarrierBlock size={18} />,
  },
  {
    title: 'Game Client',
    label: '',
    href: '/game-client',
    icon: <IconDeviceGamepad2 size={18} />,
  },
  //   {
  //   title: 'Shops',
  //   label: '10',
  //   href: '/requests',
  //   icon: <IconRouteAltLeft size={18} />,
  //   sub: [
  //     {
  //       title: 'Trucks',
  //       label: '9',
  //       href: '/trucks',
  //       icon: <IconTruck size={18} />,
  //     },
  //     {
  //       title: 'Cargos',
  //       label: '',
  //       href: '/cargos',
  //       icon: <IconBoxSeam size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Authentication',
  //   label: '',
  //   href: '',
  //   icon: <IconUserShield size={18} />,
  //   sub: [
  //     {
  //       title: 'Sign In (email + password)',
  //       label: '',
  //       href: '/sign-in',
  //       icon: <IconHexagonNumber1 size={18} />,
  //     },
  //     {
  //       title: 'Sign In (Box)',
  //       label: '',
  //       href: '/sign-in-2',
  //       icon: <IconHexagonNumber2 size={18} />,
  //     },
  //     {
  //       title: 'Sign Up',
  //       label: '',
  //       href: '/sign-up',
  //       icon: <IconHexagonNumber3 size={18} />,
  //     },
  //     {
  //       title: 'Forgot Password',
  //       label: '',
  //       href: '/forgot-password',
  //       icon: <IconHexagonNumber4 size={18} />,
  //     },
  //     {
  //       title: 'OTP',
  //       label: '',
  //       href: '/otp',
  //       icon: <IconHexagonNumber5 size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Game Masters',
  //   label: '',
  //   href: '/game-masters',
  //   icon: <IconUserHeart size={18} />,
  // },
  // {
  //   title: 'Rules',
  //   label: '',
  //   href: '/rules',
  //   icon: <IconUsers size={18} />,
  // },
  // {
  //   title: 'Analysis',
  //   label: '',
  //   href: '/analysis',
  //   icon: <IconChartHistogram size={18} />,
  // },
  // {
  //   title: 'Extra Components',
  //   label: '',
  //   href: '/extra-components',
  //   icon: <IconComponents size={18} />,
  // },
  // {
  //   title: 'Error Pages',
  //   label: '',
  //   href: '',
  //   icon: <IconExclamationCircle size={18} />,
  //   sub: [
  //     {
  //       title: 'Not Found',
  //       label: '',
  //       href: '/404',
  //       icon: <IconError404 size={18} />,
  //     },
  //     {
  //       title: 'Internal Server Error',
  //       label: '',
  //       href: '/500',
  //       icon: <IconServerOff size={18} />,
  //     },
  //     {
  //       title: 'Maintenance Error',
  //       label: '',
  //       href: '/503',
  //       icon: <IconBarrierBlock size={18} />,
  //     },
  //     {
  //       title: 'Unauthorised Error',
  //       label: '',
  //       href: '/401',
  //       icon: <IconLock size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Settings',
  //   label: '',
  //   href: '/settings',
  //   icon: <IconSettings size={18} />,
  // },
]
