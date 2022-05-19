import { Checkbox } from "@/components/Checkbox";
import { AddressFragment } from "@/graphql";
import { useCheckout } from "@/hooks/useCheckout";
import { useFormattedMessages } from "@/hooks/useFormattedMessages";
import { useBillingSameAsShipping } from "@/providers/BillingSameAsShippingProvider";
import { useAuthState } from "@saleor/sdk";
import React from "react";
import { GuestAddressSection } from "./GuestAddressSection";
import { UserDefaultAddressFragment } from "./types";
import { useCheckoutAddressUpdate } from "./useCheckoutAddressUpdate";
import { UserAddressSection } from "./UserAddressSection";

export interface ShippingAddressSectionProps {
  addresses?: AddressFragment[] | null;
  defaultShippingAddress: UserDefaultAddressFragment;
}

export const ShippingAddressSection: React.FC<ShippingAddressSectionProps> = ({
  defaultShippingAddress,
  addresses = [],
}) => {
  const formatMessage = useFormattedMessages();
  const { user: authUser } = useAuthState();
  const { checkout } = useCheckout();
  const { isBillingSameAsShippingAddress, setIsBillingSameAsShippingAddress } =
    useBillingSameAsShipping();

  const defaultAddress = checkout?.shippingAddress || defaultShippingAddress;

  const { updateShippingAddress } = useCheckoutAddressUpdate();

  return (
    <>
      {authUser ? (
        <UserAddressSection
          title={formatMessage("shippingAddress")}
          type="SHIPPING"
          onAddressSelect={updateShippingAddress}
          // @ts-ignore TMP
          addresses={addresses as UserAddressFormData[]}
          defaultAddress={defaultAddress}
        />
      ) : (
        <GuestAddressSection
          address={checkout?.shippingAddress as AddressFragment}
          title={formatMessage("shippingAddress")}
          onSubmit={updateShippingAddress}
          errorScope="checkoutShippingUpdate"
        />
      )}
      <Checkbox
        value="useShippingAsBilling"
        checked={isBillingSameAsShippingAddress}
        onChange={setIsBillingSameAsShippingAddress}
        label={formatMessage("useShippingAsBilling")}
      />
    </>
  );
};
