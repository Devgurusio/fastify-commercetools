const CartDiscountRepository = require("./lib/repositories/cart-discount");
const CartRepository = require("./lib/repositories/cart");
const CategoryRepository = require("./lib/repositories/category");
const ChannelRepository = require("./lib/repositories/channel");
const CustomObjectRepository = require("./lib/repositories/custom-object");
const CustomerGroupRepository = require("./lib/repositories/customer-group");
const CustomerRepository = require("./lib/repositories/customer");
const DiscountCodeRepository = require("./lib/repositories/discount-code");
const ExtensionRepository = require("./lib/repositories/extension");
const InventoryRepository = require("./lib/repositories/inventory");
const MessageRepository = require("./lib/repositories/message");
const MyCartRepository = require("./lib/repositories/my-cart");
const MyOrderRepository = require("./lib/repositories/my-order");
const OrderImportRepository = require("./lib/repositories/order-import");
const OrderRepository = require("./lib/repositories/order");
const PaymentRepository = require("./lib/repositories/payment");
const ProductDiscountRepository = require("./lib/repositories/product-discount");
const ProductProjectionRepository = require("./lib/repositories/product-projection");
const ProductTypeRepository = require("./lib/repositories/product-type");
const ProductRepository = require("./lib/repositories/product");
const ProjectRepository = require("./lib/repositories/project");
const ReviewRepository = require("./lib/repositories/review");
const ShippingMethodRepository = require("./lib/repositories/shipping-method");
const ShoppingListRepository = require("./lib/repositories/shopping-list");
const StateRepository = require("./lib/repositories/state");
const SubscriptionRepository = require("./lib/repositories/subscription");
const TaxCategoryRepository = require("./lib/repositories/tax-category");
const TypeRepository = require("./lib/repositories/type");
const ZoneRepository = require("./lib/repositories/zone");

module.exports = connection => ({
  CartDiscountRepository: new CartDiscountRepository(connection),
  CartRepository: new CartRepository(connection),
  CategoryRepository: new CategoryRepository(connection),
  ChannelRepository: new ChannelRepository(connection),
  CustomObjectRepository: new CustomObjectRepository(connection),
  CustomerGroupRepository: new CustomerGroupRepository(connection),
  CustomerRepository: new CustomerRepository(connection),
  DiscountCodeRepository: new DiscountCodeRepository(connection),
  ExtensionRepository: new ExtensionRepository(connection),
  InventoryRepository: new InventoryRepository(connection),
  MessageRepository: new MessageRepository(connection),
  MyCartRepository: new MyCartRepository(connection),
  MyOrderRepository: new MyOrderRepository(connection),
  OrderImportRepository: new OrderImportRepository(connection),
  OrderRepository: new OrderRepository(connection),
  PaymentRepository: new PaymentRepository(connection),
  ProductDiscountRepository: new ProductDiscountRepository(connection),
  ProductProjectionRepository: new ProductProjectionRepository(connection),
  ProductTypeRepository: new ProductTypeRepository(connection),
  ProductRepository: new ProductRepository(connection),
  ProjectRepository: new ProjectRepository(connection),
  ReviewRepository: new ReviewRepository(connection),
  ShippingMethodRepository: new ShippingMethodRepository(connection),
  ShoppingListRepository: new ShoppingListRepository(connection),
  StateRepository: new StateRepository(connection),
  SubscriptionRepository: new SubscriptionRepository(connection),
  TaxCategoryRepository: new TaxCategoryRepository(connection),
  TypeRepository: new TypeRepository(connection),
  ZoneRepository: new ZoneRepository(connection)
});
