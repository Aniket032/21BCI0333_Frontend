// Attorney Aggregation Type
type AttorneyBucket = {
  doc_count: number;
  key: string;
};

type AttorneysAggregation = {
  buckets: AttorneyBucket[];
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
};

// Class Codes Aggregation Type
type ClassCodeBucket = {
  doc_count: number;
  key: string;
};

type ClassCodesAggregation = {
  buckets: ClassCodeBucket[];
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
};

// Country Aggregation Type
type CountryBucket = {
  doc_count: number;
  key: string;
};

type CountryAggregation = {
  buckets: CountryBucket[];
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
};

// Current Owners Aggregation Type
export type CurrentOwnerBucket = {
  doc_count: number;
  key: string;
};

type CurrentOwnersAggregation = {
  buckets: CurrentOwnerBucket[];
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
};

// Law Firms Aggregation Type
type LawFirmBucket = {
  doc_count: number;
  key: string;
};

type LawFirmsAggregation = {
  buckets: LawFirmBucket[];
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
};

// Office Actions Aggregation Type (Empty Buckets)
type OfficeActionsAggregation = {
  buckets: unknown[];
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
};

// Aggregations Type (Overall)
type Aggregations = {
  attorneys: AttorneysAggregation;
  class_codes: ClassCodesAggregation;
  country: CountryAggregation;
  current_owners: CurrentOwnersAggregation;
  law_firms: LawFirmsAggregation;
  office_actions: OfficeActionsAggregation;
};

// Hits and Shards Types
type HitSource = {
  registration_number: string;
  registration_date: number;
  filing_date: number;
  status_date: number;
  renewal_date?: number;
  date_type: string;
  status_code: number;
  status_type: string;
  search_bar: {
    attorneys: string;
    law_firm: string;
    mark_identification: string;
    owner: string;
  };
  starting_letter: {
    mark_name: string;
    owner: string;
    law_firm: string;
  };
  mark_identification: string;
  law_firm_cleaned: string;
  current_owner: string;
  current_owner_cleaned: string;
  mark_description_code: string[];
  mark_description_description: string[];
  first_use_anywhere_date: number;
  class_codes: string[];
  country: string;
  owner_location: {
    lat: number;
    lon: number;
  };
  mark_status_key: number;
  is_lrapc: boolean;
  law_firm: string;
};

type Hit = {
  _id: string;
  _index: string;
  _score: number;
  sort: [string, number, number];
  _source: HitSource;
};

type Hits = {
  hits: Hit[];
  max_score: number;
  total: {
    relation: string;
    value: number;
  };
};

// Shards Type
type Shards = {
  failed: number;
  skipped: number;
  successful: number;
  total: number;
};

// Overall Body Type
type Body = {
  aggregations: Aggregations;
  hits: Hits;
  _shards: Shards;
  timed_out: boolean;
  took: number;
};

// Root Response Type
export type RootResponse = {
  body: Body;
  msg: string;
};
