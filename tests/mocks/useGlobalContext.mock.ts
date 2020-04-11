import * as GlobalContext from '@store/GlobalContext';

// Mocks useGlobalContext
const useGlobalContext = jest.spyOn(GlobalContext, 'useGlobalContext');

/**
 * mockUseGlobalContext"
 * Mocks the useGlobalContext React hook
 */

const mockUseGlobalContext = (props: GlobalContext.GlobalContextProps) => {
  useGlobalContext.mockImplementation(() => ({
    currentLocale: props.currentLocale,
    locales: props.locales,
    device: props.device,
    domain: props.domain,
    url: props.url,
  }));
};

export default mockUseGlobalContext;
