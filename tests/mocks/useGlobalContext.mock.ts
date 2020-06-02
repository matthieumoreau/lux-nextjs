import * as GlobalContext from '@store/GlobalContext';

// Mocks useGlobalContext
const useGlobalContext = jest.spyOn(GlobalContext, 'useGlobalContext');

/**
 * mockUseGlobalContext"
 * Mocks the useGlobalContext React hook
 */

const mockUseGlobalContext = ({ state, dispatch }: GlobalContext.GlobalContext) => {
    useGlobalContext.mockImplementation(() => ({
        state: {
            currentLocale: state.currentLocale,
            locales: state.locales,
            device: state.device,
            domain: state.domain,
            ctx: state.ctx,
            urls: state.urls,
        }
    }));
};

export default mockUseGlobalContext;
