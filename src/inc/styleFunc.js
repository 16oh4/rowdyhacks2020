import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles'

export const getScaledProperty = (scaleProps, mobileVal, iPadVal, desktopVal) => {
    if(scaleProps['isiPad']) return iPadVal;
    if(scaleProps['isMobile']) return mobileVal;
    if(scaleProps['isDesktop']) return desktopVal;
}

export const useDeviceScales = () => {
    const theme = useTheme();
    const isiPadWidth = useMediaQuery('(width:768px)');
    const isiPadHeight = useMediaQuery('(height:1024px)');

    const isiPadProWidth = useMediaQuery('(width:1024px)');
    const isiPadProHeight = useMediaQuery('(height:1366px)')

    const isiPad = (isiPadWidth && isiPadHeight) || (isiPadProHeight && isiPadProWidth);
    const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return [isMobile, isiPad, isDesktop];
}