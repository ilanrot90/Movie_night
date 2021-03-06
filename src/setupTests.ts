// this adds jest-dom's custom assertions - setupTests
import '@testing-library/jest-dom/extend-expect';
import 'jest-extended';
import 'jest-canvas-mock';
import 'jest-styled-components';
import 'mutationobserver-shim';
import 'testingUtils/initializer';
import 'snapshot-diff';
import '__mocks__/firebase';
import '__mocks__/framer-motion';
