const BaseRepository = require("./base");

/**
 * Product Projections repository
 * @extends BaseRepository
 */
class ProductProjection extends BaseRepository {
  /**
   * Returns the requestBuilder service name
   * @private
   */
  static get service() {
    return "productProjections";
  }

  /**
   * @throws Method Not Allowed
   */
  async create() {
    const error = {
      status: 405,
      body: {
        statusCode: 405,
        message: "Product Projections doesn't allow CREATE"
      }
    };

    throw error;
  }

  /**
   * @throws Method Not Allowed
   */
  async update() {
    const error = {
      status: 405,
      body: {
        statusCode: 405,
        message: "Product Projections doesn't allow UPDATE"
      }
    };

    throw error;
  }

  /**
   * @throws Method Not Allowed
   */
  async delete() {
    const error = {
      status: 405,
      body: {
        statusCode: 405,
        message: "Product Projections doesn't allow DELETE"
      }
    };

    throw error;
  }

  /**
   * Returns the queryOne parameters
   * @protected
   * @param {Object} query
   * @param {string[]} query.expand - array of {@link https://docs.commercetools.com/http-api.html#reference-expansion|Reference Expansion}
   * @param {boolean} query.staged - query for current or staged projections
   * @param {string} query.priceCurrency - currency code compliant to {@link https://en.wikipedia.org/wiki/ISO_4217|ISO 4217}
   * @param {string} query.priceCountry - has to be used in conjuntion with priceCurrency. A two-digit country code as per {@link https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2|ISO 3166-1 alpha-2}
   * @param {string} query.priceCustomerGroup - enables {@link https://docs.commercetools.com/http-api-projects-products.html#price-selection|Price Selection}. Has to be used in conjuntion with priceCurrency.
   * @param {string} query.priceChannel - enables {@link https://docs.commercetools.com/http-api-projects-products.html#price-selection|Price Selection}. Has to be used in conjuntion with priceCurrency.
   */
  getParams(query) {
    const {
      staged,
      priceCurrency,
      priceCountry,
      priceCustomerGroup,
      priceChannel
    } = query || {};

    return {
      ...super.getParams(query),
      ...(staged !== undefined && { staged }),
      ...(priceCurrency && { priceCurrency }),
      ...(priceCountry && { priceCountry }),
      ...(priceCustomerGroup && { priceCustomerGroup }),
      ...(priceChannel && { priceChannel })
    };
  }

  /**
   * Returns the query parameters
   * @protected
   * @param {Object} query
   * @param {string[]} query.where - array of where clauses
   * @param {string} query.whereOperator - where operator to join where clauses ("and" or "or")
   * @param {string[]} query.expand - array of {@link https://docs.commercetools.com/http-api.html#reference-expansion|Reference Expansion}
   * @param {string} query.page - page to return
   * @param {string} query.perPage - max resources per page
   * @param {Object[]} query.sort - sort clauses
   * @param {string} query.sort.by - field to sort by
   * @param {string} query.sort.direction - sort direction ("asc" or "desc")
   * @param {string} query.sortBy - Deprecated: field to sort by
   * @param {string} query.sortDirection - Deprecated: sort direction ("asc" or "desc")
   * @param {boolean} query.staged - query for current or staged projections
   * @param {string} query.priceCurrency - currency code compliant to {@link https://en.wikipedia.org/wiki/ISO_4217|ISO 4217}
   * @param {string} query.priceCountry - has to be used in conjuntion with priceCurrency. A two-digit country code as per {@link https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2|ISO 3166-1 alpha-2}
   * @param {string} query.priceCustomerGroup - enables {@link https://docs.commercetools.com/http-api-projects-products.html#price-selection|Price Selection}. Has to be used in conjuntion with priceCurrency.
   * @param {string} query.priceChannel - enables {@link https://docs.commercetools.com/http-api-projects-products.html#price-selection|Price Selection}. Has to be used in conjuntion with priceCurrency.
   */
  getQueryParams(query) {
    const {
      staged,
      priceCurrency,
      priceCountry,
      priceCustomerGroup,
      priceChannel
    } = query || {};

    return {
      ...super.getQueryParams(query),
      ...(staged !== undefined && { staged }),
      ...(priceCurrency && { priceCurrency }),
      ...(priceCountry && { priceCountry }),
      ...(priceCustomerGroup && { priceCustomerGroup }),
      ...(priceChannel && { priceChannel })
    };
  }

  /**
   * Returns the search query parameters
   * @protected
   * @param {Object} query
   * @param {Object[]} query.text - array of text to analyze and search for
   * @param {string} query.text[].language - language in form of an {@link https://en.wikipedia.org/wiki/IETF_language_tag|IETF language tag}
   * @param {string} query.text[].value - text to analyze and search for
   * @param {boolean} query.fuzzy - whether to apply {@link https://docs.commercetools.com/http-api-projects-products-search#fuzzy-search|fuzzy search} on the text to analyze.
   * @param {number} query.fuzzyLevel - provide explicitly the fuzzy level desired if fuzzy is enabled. This value can not be higher than the one chosen by the platform by default.
   * @param {string[]} query.filter - applies a filter to the query results after {@link https://docs.commercetools.com/http-api-projects-products-search#facets|facets} have been calculated. Filters in this scope don’t influence facet counts any more.
   * @param {string[]} query.filterByQuery - applies a filter to the query results before {@link https://docs.commercetools.com/http-api-projects-products-search#facets|facets} have been calculated. Filters in this scope influence facet counts. If facets are not used, this scope should be preferred over filter.
   * @param {string[]} query.filterByFacets - applies a filter to all {@link https://docs.commercetools.com/http-api-projects-products-search#facets|facets} calculations (but not query results), except for those facets that operate on the exact same field as a filter parameter. This behavior in combination with the filter scope enables multi-select faceting.
   * @param {string[]} query.facet - array of {@link https://docs.commercetools.com/http-api-projects-products-search#facets|Facets}
   * @param {string[]} query.expand - array of {@link https://docs.commercetools.com/http-api.html#reference-expansion|Reference Expansion}
   * @param {string} query.page - page to return
   * @param {string} query.perPage - max resources per page
   * @param {Object[]} query.sort - sort clauses
   * @param {string} query.sort[].by - field to sort by
   * @param {string} query.sort[].direction - sort direction ("asc" or "desc")
   * @param {string} query.sortBy - Deprecated: field to sort by
   * @param {string} query.sortDirection - Deprecated: sort direction ("asc" or "desc")
   * @param {boolean} query.staged - query for current or staged projections
   * @param {string} query.priceCurrency - currency code compliant to {@link https://en.wikipedia.org/wiki/ISO_4217|ISO 4217}
   * @param {string} query.priceCountry - has to be used in conjuntion with priceCurrency. A two-digit country code as per {@link https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2|ISO 3166-1 alpha-2}
   * @param {string} query.priceCustomerGroup - enables {@link https://docs.commercetools.com/http-api-projects-products.html#price-selection|Price Selection}. Has to be used in conjuntion with priceCurrency.
   * @param {string} query.priceChannel - enables {@link https://docs.commercetools.com/http-api-projects-products.html#price-selection|Price Selection}. Has to be used in conjuntion with priceCurrency.
   * @param {boolean} query.markMatchingVariants - whether to {@link https://docs.commercetools.com/http-api-projects-products-search#matchingVariant mark product variants} in the search result matching the criteria
   */
  getSearchQueryParams(query) {
    const {
      text,
      fuzzy,
      fuzzyLevel,
      filter,
      filterByQuery,
      filterByFacets,
      facet,
      page,
      perPage,
      staged,
      markMatchingVariants,
      priceCurrency,
      priceCountry,
      priceCustomerGroup,
      priceChannel,
      expand
    } = query || {};

    let { sort, sortBy, sortDirection } = query || {};
    if (!sort || !sort.length) {
      sort = [];
    }
    if (sortBy) {
      sort.push({ by: sortBy, direction: sortDirection });
    }

    return {
      ...(text && { text }),
      ...(fuzzy !== undefined && { fuzzy }),
      ...(fuzzyLevel !== undefined && { fuzzyLevel: parseInt(fuzzyLevel, 10) }),
      filter: [...(filter && filter.length ? filter : [])],
      filterByQuery: [
        ...(filterByQuery && filterByQuery.length ? filterByQuery : [])
      ],
      filterByFacets: [
        ...(filterByFacets && filterByFacets.length ? filterByFacets : [])
      ],
      facet: [...(facet && facet.length ? facet : [])],
      sort,
      ...(page && { page: parseInt(page, 10) }),
      ...(perPage && { perPage: parseInt(perPage, 10) }),
      ...(staged !== undefined && { staged }),
      ...(markMatchingVariants !== undefined && { markMatchingVariants }),
      ...(priceCurrency && { priceCurrency }),
      ...(priceCountry && { priceCountry }),
      ...(priceCustomerGroup && { priceCustomerGroup }),
      ...(priceChannel && { priceChannel }),
      expand: [...(expand && expand.length ? expand : [])]
    };
  }

  /**
   * Provides high performance search queries over ProductProjections
   * @param {Object} query
   * @returns {Object} - {@link https://docs.commercetools.com/http-api.html#pagedqueryresult|PagedQueryResult} with the results array of {@link https://docs.commercetools.com/http-api-projects-productProjections.html#productprojection|ProductProjection}
   */
  async search(query) {
    const response = await this.connection.execute({
      uri: this.getRequestBuilder()
        .productProjectionsSearch.parse(this.getSearchQueryParams(query))
        .build(),
      method: "GET"
    });

    return response.body;
  }

  /**
   * Returns the search query parameters
   * @protected
   * @param {Object} query
   * @param {boolean} query.fuzzy - whether to apply {@link https://docs.commercetools.com/http-api-projects-products-search#fuzzy-search|fuzzy search} on the text to analyze.
   * @param {number} query.fuzzyLevel - provide explicitly the fuzzy level desired if fuzzy is enabled. This value can not be higher than the one chosen by the platform by default.
   * @param {string} query.limit - max suggestions
   * @param {boolean} query.staged - query for current or staged projections
   */
  getSuggestQueryParams(query) {
    const { fuzzy, limit, staged, searchKeywords } = query || {};

    return {
      searchKeywords,
      ...(fuzzy !== undefined && { fuzzy }),
      ...(limit && { perPage: parseInt(limit, 10) }),
      ...(staged !== undefined && { staged })
    };
  }

  /**
   * Returns {@link https://docs.commercetools.com/http-api-projects-products-suggestions|Product Suggestions}
   * @param {Object} query
   */
  async suggest(query) {
    const response = await this.connection.execute({
      uri: this.getRequestBuilder()
        .productProjectionsSuggest.parse(this.getSuggestQueryParams(query))
        .build(),
      method: "GET"
    });

    return response.body;
  }
}

module.exports = ProductProjection;
