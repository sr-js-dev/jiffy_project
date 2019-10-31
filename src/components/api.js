const BASEURL = 'http://brandnewkey.sohosted-vps.nl:1012/api/factory';
export default {
  GetSalesData: `${BASEURL}/execute/Jiffy/getSalesOrders`,
  GetCustomerData: `${BASEURL}/execute/Jiffy/getCustomersDropdown`,
  PostSalesOrder: `${BASEURL}/execute/Jiffy/postSalesOrder`,
  GetSalesDetail: `${BASEURL}/execute/Jiffy/getSalesOrder`,
  // GetSalesItems: `${BASEURL}/Appmakerz-Test/getSalesItemsDropdown`,
  // GetSalesItemsPrice: `${BASEURL}/Appmakerz-Test/getSalesPrice`,
  // PostSalesOrderLine: `${BASEURL}/Appmakerz-Test/postSalesOrderLine`,
  // GetSalesOrderLines: `${BASEURL}/Appmakerz-Test/getSalesOrderLines`,
  // GetSuppliersDropdown: `${BASEURL}/Exact-Test/getSuppliersDropdown`,
  // GetJournalsDropdown: `${BASEURL}/Exact-Test/getJournalsDropdown`,
  // GetToken: `${BASEURL}/Exact-Test/getJournalsDropdown`,
  };