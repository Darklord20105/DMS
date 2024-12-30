import { Nav }  from './nav.js'
import { Outlet } from 'react-router-dom'
/*
import NotificationsSystem, {atalhoTheme, dismissNotification} from 'reapop'
import {setUpNotifications} from 'reapop'

setUpNotifications({
    defaultProps: {
        position: 'bottom-left',
        dismissible: true,
        showDismissButton:true,
        dismissAfter: 5000,
    }
})
*/
export function Layout(){
  return(
    <>
      <Nav/>
      <Outlet />
	{/*
      <NotificationsSystem
        // 2. Pass the notifications you want Reapop to display.
        notifications={notifications}
	// 3. Pass the function used to dismiss a notification.
        dismissNotification={(id) => dismissNotification(id)}
        // 4. Pass a builtIn theme or a custom theme.
        theme={atalhoTheme}
      />*/}
    </>
  )
}
