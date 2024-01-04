import dashboard from '../en/dashboard.json';
import productConfig from '../en/productConfig.json';
import manufacturer from '../en/manufacturer.json';
import supplier from '../en/supplier.json';
const en = {
    ...dashboard,
    ...supplier,
    ...productConfig,
    ...manufacturer,
}
export default en;
