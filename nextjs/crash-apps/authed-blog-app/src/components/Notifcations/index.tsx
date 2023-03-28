import NotificationsSystem, {atalhoTheme, setUpNotifications, useNotifications, wyboTheme } from 'reapop';

setUpNotifications({
    defaultProps: {
        position: 'top-right',
        dismissible: true,
        dismissAfter: 10*1000,
        showDismissButton: true
    } 
})

export default function MyNotification() {
    const { notifications, dismissNotification } = useNotifications();

    return <NotificationsSystem notifications={notifications} dismissNotification={(id) => dismissNotification(id)} theme={wyboTheme} />
}