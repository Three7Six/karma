import React, { Component } from "react";
import PropTypes from "prop-types";

import { observer } from "mobx-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";

import { APIGroup } from "Models/API";
import { SilenceFormStore } from "Stores/SilenceFormStore";
import { FilteringLabel } from "Components/Labels/FilteringLabel";
import { FilteringCounterBadge } from "Components/Labels/FilteringCounterBadge";
import { TooltipWrapper } from "Components/TooltipWrapper";
import { GroupMenu } from "./GroupMenu";

const GroupHeader = observer(
  class GroupHeader extends Component {
    static propTypes = {
      collapseStore: PropTypes.shape({
        value: PropTypes.bool.isRequired,
        toggle: PropTypes.func.isRequired
      }).isRequired,
      group: APIGroup.isRequired,
      silenceFormStore: PropTypes.instanceOf(SilenceFormStore).isRequired
    };

    render() {
      const { collapseStore, group, silenceFormStore } = this.props;

      return (
        <h5 className="card-title mb-0 d-flex flex-row">
          <span className="flex-shrink-0 flex-grow-0">
            <GroupMenu group={group} silenceFormStore={silenceFormStore} />
          </span>
          <span className="flex-shrink-1 flex-grow-1" style={{ minWidth: 0 }}>
            {Object.keys(group.labels).map(name => (
              <FilteringLabel
                key={name}
                name={name}
                value={group.labels[name]}
              />
            ))}
          </span>
          <span className="flex-shrink-0 flex-grow-0 ml-auto pl-1">
            <FilteringCounterBadge
              name="@state"
              value="unprocessed"
              counter={group.stateCount.unprocessed}
            />
            <FilteringCounterBadge
              name="@state"
              value="suppressed"
              counter={group.stateCount.suppressed}
            />
            <FilteringCounterBadge
              name="@state"
              value="active"
              counter={group.stateCount.active}
            />
            <span
              className="text-muted cursor-pointer badge text-nowrap text-truncate px-0"
              onClick={collapseStore.toggle}
            >
              <TooltipWrapper title="Toggle group details">
                <FontAwesomeIcon
                  icon={collapseStore.value ? faChevronUp : faChevronDown}
                />
              </TooltipWrapper>
            </span>
          </span>
        </h5>
      );
    }
  }
);

export { GroupHeader };
