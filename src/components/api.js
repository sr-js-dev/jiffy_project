const BASEURL = 'https://brandnewkey.sohosted-vps.nl:44401/api/factory';
export default {
  GetSalesData: `${BASEURL}/execute/Jiffy/getSalesOrders`,
  GetCustomerData: `${BASEURL}/execute/Jiffy/getCustomersDropdown`,
  PostSalesOrder: `${BASEURL}/execute/Jiffy/postSalesOrder`,
  GetSalesDetail: `${BASEURL}/execute/Jiffy/getSalesOrder`,
  GetSalesItems: `${BASEURL}/execute/Jiffy/getBasicProductsDropdown`,
  GetAdditionItems: `${BASEURL}/execute/Jiffy/getAdditions`,
  GetMaterialItems: `${BASEURL}/execute/Jiffy/getPackagingDropdown`,
  // PostSalesOrderLine: `${BASEURL}/Appmakerz-Test/postSalesOrderLine`,
  // GetSalesOrderLines: `${BASEURL}/Appmakerz-Test/getSalesOrderLines`,
  // GetSuppliersDropdown: `${BASEURL}/Exact-Test/getSuppliersDropdown`,
  // GetJournalsDropdown: `${BASEURL}/Exact-Test/getJournalsDropdown`,
  // GetToken: `${BASEURL}/Exact-Test/getJournalsDropdown`,
  };