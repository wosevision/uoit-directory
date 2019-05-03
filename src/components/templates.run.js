export const TemplateRun = ['$templateCache', '$browser', function($templateCache, $browser) {$templateCache.put('pagination.component.html','<div class="text-center pagination-container" ng-show="$ctrl.numberOfItems">\n  <ul class="pagination" role="navigation" aria-label="Pagination">\n    <li class="pagination-previous">\n      <a role="button" ng-class="{ disabled: ($ctrl.currentPage === 0) }"\n        ng-click="!($ctrl.currentPage === 0) && $ctrl.onPrev()">\n        <span class="icon_arrow_left"></span>\n        Previous\n        <span class="show-for-sr">page</span>\n      </a>\n    </li>\n    <li ng-repeat="page in $ctrl.$state.pageNumbers">\n      <a aria-label="Page {{ ::page }}" ng-click="$ctrl.onGoto({ $event: page})"\n        ng-class="{ current: ($ctrl.currentPage + 1) === page }">\n        <span ng-show="($ctrl.currentPage + 1) === page" class="show-for-sr">currently viewing</span>\n        <span class="show-for-sr">page</span>{{ ::page }}\n      </a>\n    </li>\n    <li class="pagination-next">\n      <a role="button" ng-class="{ disabled: (($ctrl.currentPage + 1) >= $ctrl.$state.numberOfPages) }"\n        ng-click="!(($ctrl.currentPage + 1) >= $ctrl.$state.numberOfPages) && $ctrl.onNext()">\n        Next\n        <span class="show-for-sr">page</span>\n        <span class="icon_arrow_right"></span>\n      </a>\n    </li>\n  </ul>\n  <span class="label tertiary">\n    {{ $ctrl.currentPage + 1 }} out of {{ $ctrl.$state.numberOfPages }}\n  </span>\n</div>');
$templateCache.put('search-form.component.html','<form>\n  <div class="row">\n    <div class="xxsmall-12 medium-3 columns">\n      <label>First name:\n        <input type="text" ng-model="$ctrl.searchQuery.firstname" ng-value="$ctrl.initialQuery.firstname"\n          ng-change="$ctrl.onChange({ $event: $ctrl.searchQuery })" ng-model-options="{ debounce: 200 }" />\n        <span class="form-error" style="display:block;" ng-show="$ctrl.$state.userError">\n          {{ $ctrl.$state.userError }}\n        </span>\n      </label>\n    </div>\n    <div class="xxsmall-12 medium-3 columns">\n      <label>Last name:\n        <input type="text" ng-model="$ctrl.searchQuery.lastname" ng-value="$ctrl.initialQuery.lastname"\n          ng-change="$ctrl.onChange({ $event: $ctrl.searchQuery })" ng-model-options="{ debounce: 200 }" />\n        <span class="form-error" style="display:block;" ng-show="$ctrl.$state.userError">\n          {{ $ctrl.$state.userError }}\n        </span>\n      </label>\n    </div>\n    <div class="xxsmall-12 medium-3 columns">\n      <label>\n        Select department:\n        <select ng-if="$ctrl.departments" ng-model="$ctrl.searchQuery.department"\n          ng-options="department for department in ::$ctrl.departments"\n          ng-change="$ctrl.onChange({ $event: $ctrl.searchQuery })">\n          <option value="">-- select department --</option>\n        </select>\n        <select ng-hide="$ctrl.departments" disabled>\n          <option value="">Loading departments&hellip;</option>\n        </select>\n        <span class="form-error" style="display:block;" ng-show="$ctrl.$state.departmentError">\n          {{ $ctrl.$state.departmentError }}\n        </span>\n      </label>\n    </div>\n    <div class="xxsmall-12 medium-3 columns"\n      ng-if="$ctrl.searchQuery.department || $ctrl.searchQuery.lastname || $ctrl.searchQuery.firstname">\n      <button class="button results-button" ng-click="$ctrl.onSubmit({ $event: $ctrl.searchQuery })"\n        ng-disabled="$ctrl.loadingResults || !$ctrl.hasResults">\n        <span ng-show="!$ctrl.loadingResults && $ctrl.hasResults">Results below &nbsp;\n          <span class="icon_arrow_down bounce"></span>\n        </span>\n        <span ng-show="$ctrl.loadingResults">Loading results&hellip;</span>\n        <span ng-show="!$ctrl.loadingResults && !$ctrl.hasResults">No results found!</span>\n      </button>\n    </div>\n  </div>\n</form>');
$templateCache.put('search-result.component.html','<a class="accordion-title" ng-click="$ctrl.onExpand({ $event: $ctrl.result })">\n  {{ ::$ctrl.result.firstname }} {{ ::$ctrl.result.lastname }}\n  <ul class="accordion-title-desc">\n    <li>\n      <strong>Department:</strong>\n      {{ ::$ctrl.result.department }}\n    </li>\n    <li>\n      <strong>Position:</strong>\n      {{ ::$ctrl.result.position }}\n    </li>\n  </ul>\n</a>\n<div class="a-content">\n  <ul class="search-list-info">\n    <li>\n      <strong>Building:</strong>\n      {{ ::$ctrl.result.building }}\n    </li>\n    <li>\n      <strong>Office:</strong>\n      {{ ::$ctrl.result.office && $ctrl.result.office.length ? $ctrl.result.office : \'N/A\' }}\n    </li>\n    <li>\n      <strong>Extension:</strong>\n      <a href="tel:{{ ::(\'905.721.8668 ext.\' + $ctrl.result.extension) | telLink }}"\n        title="Place call to {{ ::$ctrl.result.firstname }} {{ ::$ctrl.result.lastname }}">{{::$ctrl.result.extension}}</a>\n    </li>\n    <li>\n      <strong>Email:</strong>\n      <a href="mailto:{{ ::$ctrl.result.email }}">{{ ::$ctrl.result.email | lowercase }}</a>\n    </li>\n  </ul>\n  <p class="text-right">\n    <small>\n      <a href="#tab_update-entry" title="Submit an entry update request" target="_self" ng-click="$ctrl.onUpdateRequest({\n          $event: {\n            data: $ctrl.result,\n            originalEvent: $event\n          } \n        })">\n        Notice something wrong?\n      </a>\n    </small>\n  </p>\n  <div ng-if="$ctrl.result.expert">\n    <hr />\n    <small ng-hide="$ctrl.result.expert.username">\n      <em class="subheader">Checking for Expert profile...</em>\n    </small>\n    <div class="expert-profile media-object" ng-show="$ctrl.result.expert.username">\n      <div class="media-object-section">\n        <div class="thumbnail">\n          <img ng-src="{{ ::$ctrl.result.expert.url }}"\n            alt="Photo of {{ ::$ctrl.result.expert.firstname }} {{ ::$ctrl.result.expert.lastname }}">\n        </div>\n      </div>\n      <div class="media-object-section main-section">\n        <div class="row align-middle">\n          <div class="column">\n            <h4>{{ ::$ctrl.result.expert.firstname }} {{ ::$ctrl.result.expert.lastname }}\n              <small class="subheader">on UOIT Expert Centre</small>\n            </h4>\n            <p class="expert-profile-topics">\n              <a ng-repeat="topic in ::$ctrl.result.expert.topics"\n                ng-href="https://uoit.ca/expertcentre?q={{ ::topic.name }}"\n                class="label tertiary">{{ ::topic.name }}</a>\n            </p>\n            <p>{{ ::$ctrl.result.expert.tagline }}</p>\n          </div>\n          <div class="column shrink">\n            <a ng-href="https://uoit.ca/expertcentre/expert/{{ ::$ctrl.result.expert.username }}"\n              class="button hollow">View full profile</a>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>');
$templateCache.put('search.component.html','<!-- tabs title start -->\n<ul class="tabs" data-tabs="" data-deep-link="true" data-deep-link-smudge="true" data-deep-link-smudge-delay="600"\n  id="{{ ::$ctrl.ID.DIRECTORY_TABS }}" role="tablist">\n  <li class="tabs-title is-active" role="presentation" id="searchTab" ng-click="$ctrl.clearSearchQuery()">\n    <a href="#tab_directory-search" role="tab" aria-controls="tab_directory-search" aria-selected="true"\n      id="tab_label_directory-search">Directory search</a>\n  </li>\n  <li class="tabs-title" role="presentation" id="contactsTab" ng-click="$ctrl.clearSearchQuery()">\n    <a href="#tab_common-contacts" role="tab" aria-controls="tab_common-contacts" aria-selected="false"\n      id="tab_label_common-contacts">Common contacts</a>\n  </li>\n  <li class="tabs-title" role="presentation" id="updateTab" ng-click="$ctrl.clearSearchQuery()">\n    <a href="#tab_update-entry" role="tab" aria-controls="tab_update-entry" aria-selected="false"\n      id="tab_label_update-entry">Update your entry</a>\n  </li>\n</ul>\n<!-- tabs title end -->\n<!-- tabs content start -->\n<div class="tabs-content" data-tabs-content="{{ ::$ctrl.ID.DIRECTORY_TABS }}"\n  id="{{ ::$ctrl.ID.DIRECTORY_TABS_CONTENT }}">\n  <!-- TAB 1 STARTS  -->\n  <div class="tabs-panel is-active" id="tab_directory-search" role="tabpanel" aria-hidden="false"\n    aria-labelledby="tab_label_directory-search">\n    <div class="row">\n      <div class="xxsmall-12 columns">\n        <!-- TAB TITLE  -->\n        <h2>Search</h2>\n        <br />\n        <p>Enter a first name, a last name, or a department to find a Faculty or Staff member. Partial names can also be\n          used.</p>\n      </div>\n    </div>\n    <!-- INPUT FIELDS FOR FIRST NAME, LAST NAME, AND DEPARTMENT -->\n    <directory-search-form search-query="$ctrl.$state.searchQuery" initial-query="$ctrl.$state.initialQuery"\n      departments="$ctrl.$state.departments" loading-results="$ctrl.$state.loadingResults"\n      has-results="$ctrl.$state.users.length" on-change="$ctrl.getSearchResults($event)"\n      on-submit="$ctrl.smoothScrollTo($ctrl.ID.SEARCH_RESULTS)" id="search-form">\n    </directory-search-form>\n    <p class="lead update-directory-msg">\n      <strong>Notice an incorrect entry?</strong> <a href="#tab_update-entry" title="Submit an entry update request"\n        target="_self" ng-click="$ctrl.gotoFormAndPopulate($event, {})">Let us know</a> the correct information!\n    </p>\n  </div>\n  <!-- TAB 1 END  -->\n  <!-- TAB 2 STARTS -->\n  <div class="tabs-panel" id="tab_common-contacts" role="tabpanel" aria-hidden="true"\n    aria-labelledby="tab_label_common-contacts">\n    <div ng-repeat="group in ::$ctrl.$state.contacts">\n      <h3>{{ ::group.category }}</h3>\n      <div class="row">\n        <span ng-repeat="contact in group.items"\n          class="xxsmall-6 large-6 medium-6 columns contact-card{{ ::(contact.class ? \' contact-faculty \' + contact.class : \'\') }}">\n          <p class="contact-name"><strong>{{ ::contact.name }}</strong></p>\n          <p class="contact-phone"><a href="tel:{{ ::contact.phone | telLink }}"\n              title="Place call to {{ ::contact.phone }}">{{ ::contact.phone }}</a></p>\n        </span>\n      </div>\n    </div>\n  </div>\n  <!-- TAB 2 END  -->\n  <!-- TAB 3 STARTS  -->\n  <div class="tabs-panel" id="tab_update-entry" role="tabpanel" aria-hidden="true"\n    aria-labelledby="tab_label_update-entry">\n    <!-- TAB TITLE  -->\n    <h2>Update Information</h2>\n    <br />\n    <p>If you are a Faculty or Staff member you can have your directory information updated by filling out the form\n      below.</p>\n    <p>Alternatively, you may contact <a href="mailto:directory@uoit.ca"\n        title="Contact directory@uoit.ca">directory@uoit.ca</a> directly if you have further questions or concerns.</p>\n    <!-- UPDATE FORM -->\n    <directory-update-form form-data="$ctrl.$state.formData" form-status="$ctrl.$state.formStatus"\n      on-submit="$ctrl.onUpdateFormSubmit($event)">\n    </directory-update-form>\n  </div>\n</div>\n<!-- DISPLAY ANGULAR SEARCH RESULT IN CALLOUT/SERPERATE TAB  -->\n<div class="callout" id="{{ ::$ctrl.ID.SEARCH_RESULTS }}" ng-class="{ loading: $ctrl.$state.loadingResults }"\n  ng-if="$ctrl.$state.searchQuery.department || $ctrl.$state.searchQuery.lastname || $ctrl.$state.searchQuery.firstname">\n  <div class="search-list">\n    <div class="row">\n      <div class="xxsmall-12 columns">\n        <h3>Directory search results</h3>\n      </div>\n      <div class="xxsmall-12 columns">\n        <p class="lead" ng-hide="!$ctrl.$state.users.length">To reach a Faculty or Staff member dial the main\n          switchboard at 905.721.8668 and ask for the extension listed.</p>\n        <p class="lead" ng-show="!$ctrl.$state.users.length">Sorry, no directory search results to display.</p>\n      </div>\n      <div class="xxsmall-12 columns flex-container align-middle align-right controls-container"\n        ng-show="$ctrl.$state.users.length">\n        <!-- SORT CONTROLS -->\n        <directory-sort-controls options="$ctrl.$state.sortOptions" selected="$ctrl.$state.sortOrder"\n          on-changed="$ctrl.sortBy($event)">\n        </directory-sort-controls>\n        <!-- NUMBER OF RESULTS PER PAGE -->\n        <div class="page-size-controls flex-container align-middle align-right">\n          <label id="results_per_page">Page size: &nbsp;</label>\n          <select ng-model="$ctrl.$state.pageSize" aria-labelledby="results_per_page">\n            <option ng-value="10">10</option>\n            <option ng-value="15">15</option>\n            <option ng-value="25">25</option>\n            <option ng-value="25">50</option>\n            <option ng-value="$ctrl.$state.users.length">View all</option>\n          </select>\n        </div>\n      </div>\n    </div>\n  </div>\n  <!-- SEARCH RESULTS LIST -->\n  <ul class="accordion" data-accordion data-allow-all-closed="true">\n    <!-- SEARCH RESULTS -->\n    <li class="accordion-item" ng-class="{ \'accordion-item-open\': user.show }" data-accordion-item\n      ng-repeat="user in $ctrl.$state.users | filter: $ctrl.$state.searchQuery | orderBy: $ctrl.$state.sortOrder | startFrom: $ctrl.$state.currentPage * $ctrl.$state.pageSize | limitTo: $ctrl.$state.pageSize">\n      <!-- SEARCH RESULT -->\n      <directory-search-result result="user" on-expand="user.show = !user.show; user.show && $ctrl.getExpert($event)"\n        on-update-request="$ctrl.gotoFormAndPopulate($event)">\n      </directory-search-result>\n    </li>\n  </ul>\n  <!-- PAGINATION -->\n  <directory-pagination current-page="$ctrl.$state.currentPage" page-size="$ctrl.$state.pageSize"\n    number-of-items="$ctrl.$state.users.length" on-prev="$ctrl.changePageAndScroll(-1)"\n    on-next="$ctrl.changePageAndScroll(1)" on-goto="$ctrl.gotoPageAndScroll($event)">\n  </directory-pagination>\n</div>');
$templateCache.put('sort-controls.component.html','<div class="tiny button-group align-right sort-controls">\n  <div class="flex-container align-middle">\n    <label id="sort_by">Sort: &nbsp;</label>\n  </div>\n  <button ng-repeat="option in ::$ctrl.options" id="sort_{{ ::option.id }}" class="button"\n    ng-click="$ctrl.onChanged({ $event: option.id })" ng-class="{ hollow: $ctrl.selected !== option.id }"\n    aria-labelledby="sort_by sort_{{ ::option.id }}">\n    {{ ::option.label }}\n  </button>\n</div>');
$templateCache.put('update-form.component.html','<!-- SHOW ERROR/SUCCESS MESSAGES -->\n<div ng-show="$ctrl.formStatus.success || $ctrl.formStatus.error" class="callout"\n  ng-class="{ success: $ctrl.formStatus.success, alert: $ctrl.formStatus.error }" data-closable>\n  {{ $ctrl.formStatus.success || $ctrl.formStatus.error }}\n  <button class="close-button" aria-label="Dismiss alert" type="button" data-close>\n    <span aria-hidden="true">&times;</span>\n  </button>\n</div>\n<!-- FORM -->\n<form name="$ctrl.form" ng-submit="$ctrl.form.$valid && $ctrl.onSubmit({\n    $event: {\n      formData: $ctrl.formData,\n      form: $ctrl.form\n    }\n  })">\n  <div class="row">\n    <div class="xxsmall-12 medium-12 columns text-right">\n      <label>\n        Send me a copy of the update request\n        <input type="checkbox" name="sendCopy" ng-model="$ctrl.formData.sendCopy" />\n      </label>\n    </div>\n  </div>\n  <div class="row">\n    <div class="xxsmall-12 medium-6 columns">\n      <label>Banner ID:\n        <span class="red"> *</span>\n        <input type="text" name="bannerId" ng-model="$ctrl.formData.bannerId" ng-minlength="9" ng-minlength="9"\n          ng-pattern="\'[1Ss]{1}00[0-9]{6}\'" required />\n      </label>\n    </div>\n  </div>\n  <div class="row">\n    <div class="xxsmall-12 medium-6 columns">\n      <label>First name:\n        <span class="red"> *</span>\n        <input type="text" name="firstname" ng-model="$ctrl.formData.firstname" required />\n      </label>\n    </div>\n    <div class="xxsmall-12 medium-6 columns">\n      <label>Last name:\n        <span class="red"> *</span>\n        <input type="text" name="lastname" ng-model="$ctrl.formData.lastname" required />\n      </label>\n    </div>\n  </div>\n  <div class="row">\n    <div class="xxsmall-12 medium-6 columns">\n      <label>Department:\n        <span class="red"> *</span>\n        <input type="text" name="department" ng-model="$ctrl.formData.department" required />\n      </label>\n    </div>\n    <div class="xxsmall-12 medium-6 columns">\n      <label>Title:\n        <span class="red"> *</span>\n        <input type="text" name="position" ng-model="$ctrl.formData.position" required />\n      </label>\n    </div>\n  </div>\n  <div class="row">\n    <div class="xxsmall-12 medium-6 columns">\n      <label>Building:\n        <span class="red"> *</span>\n        <input type="text" name="building" ng-model="$ctrl.formData.building" required />\n      </label>\n    </div>\n    <div class="xxsmall-12 medium-6 columns">\n      <label>Office:\n        <span class="red"> *</span>\n        <input type="text" name="office" ng-model="$ctrl.formData.office" required />\n      </label>\n    </div>\n  </div>\n  <div class="row">\n    <div class="xxsmall-12 medium-6 columns">\n      <label>Extension:\n        <span class="red"> *</span>\n        <input type="text" name="extension" ng-model="$ctrl.formData.extension" required ng-pattern="\'[0-9]+\'" />\n      </label>\n    </div>\n    <div class="xxsmall-12 medium-6 columns">\n      <label>Email:\n        <span class="red"> *</span>\n        <input type="email" name="email" ng-model="$ctrl.formData.email" required />\n      </label>\n    </div>\n  </div>\n  <fieldset class="large-6 columns">\n    <button class="button" type="submit" value="Submit" role="button" ng-disabled="$ctrl.form.$invalid">Submit</button>\n  </fieldset>\n</form>');
$browser.baseHref = $browser.baseHref = function () {
  return location.pathname;
};
}];