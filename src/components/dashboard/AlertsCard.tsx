import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Batch, Product } from '@/types';
import StatusBadge from '../status/StatusBadge';
import { batches } from '@/data/batches';
import { products } from '@/data/products';

// Get all expired or expiring batches
const getAlertBatches = () => {
  return batches
    .filter(batch => batch.status === 'expired' || batch.status === 'expiring')
    .map(batch => {
      const product = products.find(p => p.id === batch.productId);
      return {
        ...batch,
        product
      };
    })
    .slice(0, 5); // Limit to 5 items
};

const AlertsCard = () => {
  const alertBatches = getAlertBatches();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">Alertas de Validade</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {alertBatches.length > 0 ? (
            <ul className="divide-y">
              {alertBatches.map((item) => (
                <li key={item.id} className="flex items-center justify-between py-3 px-6">
                  <div className="flex items-center gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-sm">
                        {item.product?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Lote: {item.id} • Local: {item.location}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={item.status} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-6 text-center text-muted-foreground">
              Não há alertas de validade no momento.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsCard;
